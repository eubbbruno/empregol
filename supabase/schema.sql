-- EmpreGol Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE user_type AS ENUM ('candidato', 'empresa');
CREATE TYPE contract_type AS ENUM ('clt', 'pj', 'estagio', 'freelancer');
CREATE TYPE work_model AS ENUM ('presencial', 'remoto', 'hibrido');
CREATE TYPE job_level AS ENUM ('estagio', 'junior', 'pleno', 'senior', 'lideranca');
CREATE TYPE job_status AS ENUM ('ativa', 'pausada', 'encerrada');
CREATE TYPE application_status AS ENUM ('enviada', 'em_analise', 'entrevista', 'aprovado', 'recusada');
CREATE TYPE company_size AS ENUM ('startup', 'pequena', 'media', 'grande');
CREATE TYPE availability AS ENUM ('imediata', '15dias', '30dias', 'negociavel');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo user_type NOT NULL,
  nome_completo TEXT NOT NULL,
  avatar_url TEXT,
  telefone TEXT,
  cidade TEXT,
  estado TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Empresas table
CREATE TABLE empresas (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  nome_empresa TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  setor TEXT,
  tamanho company_size,
  website TEXT,
  descricao TEXT,
  logo_url TEXT,
  verificada BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Candidatos table
CREATE TABLE candidatos (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  titulo_profissional TEXT,
  resumo TEXT,
  experiencia_anos INTEGER,
  salario_pretendido INTEGER,
  disponibilidade availability DEFAULT 'negociavel',
  curriculo_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Vagas table
CREATE TABLE vagas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  requisitos TEXT[],
  beneficios TEXT[],
  tipo_contrato contract_type NOT NULL,
  modelo_trabalho work_model NOT NULL,
  cidade TEXT,
  estado TEXT,
  salario_min INTEGER,
  salario_max INTEGER,
  mostra_salario BOOLEAN DEFAULT TRUE,
  nivel job_level NOT NULL,
  area TEXT,
  skills_requeridas TEXT[],
  status job_status DEFAULT 'ativa',
  visualizacoes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Candidaturas table
CREATE TABLE candidaturas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vaga_id UUID NOT NULL REFERENCES vagas(id) ON DELETE CASCADE,
  candidato_id UUID NOT NULL REFERENCES candidatos(id) ON DELETE CASCADE,
  status application_status DEFAULT 'enviada',
  mensagem TEXT,
  curriculo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(vaga_id, candidato_id)
);

-- Indexes for better performance
CREATE INDEX idx_vagas_empresa_id ON vagas(empresa_id);
CREATE INDEX idx_vagas_status ON vagas(status);
CREATE INDEX idx_vagas_created_at ON vagas(created_at DESC);
CREATE INDEX idx_candidaturas_vaga_id ON candidaturas(vaga_id);
CREATE INDEX idx_candidaturas_candidato_id ON candidaturas(candidato_id);
CREATE INDEX idx_candidaturas_status ON candidaturas(status);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles são visíveis por todos" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir seu próprio perfil" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Empresas policies
CREATE POLICY "Empresas são visíveis por todos" ON empresas
  FOR SELECT USING (true);

CREATE POLICY "Empresas podem atualizar seus dados" ON empresas
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Empresas podem inserir seus dados" ON empresas
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Candidatos policies
CREATE POLICY "Candidatos são visíveis por empresas" ON candidatos
  FOR SELECT USING (
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND tipo = 'empresa'
    )
  );

CREATE POLICY "Candidatos podem atualizar seus dados" ON candidatos
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Candidatos podem inserir seus dados" ON candidatos
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Vagas policies
CREATE POLICY "Vagas ativas são visíveis por todos" ON vagas
  FOR SELECT USING (status = 'ativa' OR empresa_id IN (
    SELECT id FROM empresas WHERE id = auth.uid()
  ));

CREATE POLICY "Empresas podem criar vagas" ON vagas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM empresas WHERE id = auth.uid() AND id = empresa_id
    )
  );

CREATE POLICY "Empresas podem atualizar suas vagas" ON vagas
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM empresas WHERE id = auth.uid() AND id = empresa_id
    )
  );

CREATE POLICY "Empresas podem deletar suas vagas" ON vagas
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM empresas WHERE id = auth.uid() AND id = empresa_id
    )
  );

-- Candidaturas policies
CREATE POLICY "Candidatos veem suas candidaturas" ON candidaturas
  FOR SELECT USING (
    candidato_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM vagas v
      INNER JOIN empresas e ON v.empresa_id = e.id
      WHERE v.id = vaga_id AND e.id = auth.uid()
    )
  );

CREATE POLICY "Candidatos podem criar candidaturas" ON candidaturas
  FOR INSERT WITH CHECK (
    auth.uid() = candidato_id AND
    EXISTS (
      SELECT 1 FROM candidatos WHERE id = auth.uid()
    )
  );

CREATE POLICY "Candidatos podem atualizar suas candidaturas" ON candidaturas
  FOR UPDATE USING (candidato_id = auth.uid());

CREATE POLICY "Empresas podem atualizar candidaturas de suas vagas" ON candidaturas
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM vagas v
      INNER JOIN empresas e ON v.empresa_id = e.id
      WHERE v.id = vaga_id AND e.id = auth.uid()
    )
  );

-- Functions and Triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_empresas_updated_at BEFORE UPDATE ON empresas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_candidatos_updated_at BEFORE UPDATE ON candidatos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vagas_updated_at BEFORE UPDATE ON vagas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_candidaturas_updated_at BEFORE UPDATE ON candidaturas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile after user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, tipo, nome_completo, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'tipo', 'candidato'),
    COALESCE(NEW.raw_user_meta_data->>'nome_completo', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  -- Create candidato or empresa record based on tipo
  IF COALESCE(NEW.raw_user_meta_data->>'tipo', 'candidato') = 'candidato' THEN
    INSERT INTO public.candidatos (id) VALUES (NEW.id);
  ELSE
    INSERT INTO public.empresas (id, nome_empresa) 
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nome_completo', NEW.email));
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sample data for testing (optional - comment out if not needed)
/*
-- Insert sample empresa
INSERT INTO profiles (id, tipo, nome_completo, cidade, estado)
VALUES ('00000000-0000-0000-0000-000000000001', 'empresa', 'TechCorp Brasil', 'São Paulo', 'SP');

INSERT INTO empresas (id, nome_empresa, setor, tamanho, verificada)
VALUES ('00000000-0000-0000-0000-000000000001', 'TechCorp Brasil', 'Tecnologia', 'media', true);

-- Insert sample vaga
INSERT INTO vagas (
  empresa_id, titulo, descricao, tipo_contrato, modelo_trabalho,
  cidade, estado, salario_min, salario_max, nivel, area, skills_requeridas
)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Desenvolvedor Full Stack Sênior',
  'Buscamos desenvolvedor experiente em React e Node.js',
  'clt',
  'remoto',
  'São Paulo',
  'SP',
  12000,
  18000,
  'senior',
  'Tecnologia',
  ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL']
);
*/
