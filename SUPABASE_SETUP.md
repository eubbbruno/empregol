# 🗄️ Setup do Supabase - EmpreGol

Guia completo para configurar o Supabase no projeto.

## 📋 Pré-requisitos

1. Conta no Supabase (https://supabase.com)
2. Projeto criado no Supabase Dashboard

## 🚀 Passo a Passo

### 1. Obter Credenciais do Supabase

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon/public key** (chave pública)

### 2. Configurar Variáveis de Ambiente

Edite o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### 3. Executar o Schema SQL

1. No Supabase Dashboard, vá em **SQL Editor**
2. Clique em **New Query**
3. Copie todo o conteúdo de `supabase/schema.sql`
4. Cole no editor e clique em **Run**

Isso criará:
- ✅ 5 tabelas: `profiles`, `empresas`, `candidatos`, `vagas`, `candidaturas`
- ✅ Enums para tipos de dados
- ✅ Indexes para performance
- ✅ Row Level Security (RLS) policies
- ✅ Triggers para `updated_at`
- ✅ Trigger para criar profile automaticamente no signup

### 4. Verificar Tabelas

No Supabase Dashboard:
1. Vá em **Table Editor**
2. Verifique se todas as tabelas foram criadas:
   - profiles
   - empresas
   - candidatos
   - vagas
   - candidaturas

### 5. Testar Localmente

```bash
# Reiniciar o servidor dev
npm run dev
```

Acesse http://localhost:3000 e teste:
- Cadastro de novo usuário
- Login
- Dashboard

### 6. Configurar Autenticação

No Supabase Dashboard:

1. **Authentication** → **Providers**
2. Habilite **Email** (já vem habilitado)
3. (Opcional) Configure **Google OAuth**:
   - Adicione Client ID e Secret
   - Configure redirect URL: `https://seu-projeto.supabase.co/auth/v1/callback`

### 7. Configurar Storage (para uploads)

1. **Storage** → **Create bucket**
2. Nome: `avatars`
3. Public: ✅ (para avatares)
4. Allowed MIME types: `image/*`

Criar outro bucket:
- Nome: `curriculos`
- Public: ❌ (privado)
- Allowed MIME types: `application/pdf`

### 8. Políticas de Storage

**Bucket avatars:**
```sql
-- Qualquer um pode ver avatares
CREATE POLICY "Avatares são públicos"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Usuários autenticados podem fazer upload
CREATE POLICY "Usuários podem fazer upload de avatares"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**Bucket curriculos:**
```sql
-- Apenas o dono pode ver seu currículo
CREATE POLICY "Usuários podem ver seus currículos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'curriculos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Empresas podem ver currículos de candidaturas
CREATE POLICY "Empresas podem ver currículos de candidatos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'curriculos' AND
  EXISTS (
    SELECT 1 FROM candidaturas c
    INNER JOIN vagas v ON c.vaga_id = v.id
    WHERE v.empresa_id = auth.uid()
  )
);
```

## 🔐 Segurança

### RLS Policies Implementadas

✅ **Profiles:**
- Todos podem ver perfis
- Usuários só editam seu próprio perfil

✅ **Empresas:**
- Todos podem ver empresas
- Empresas só editam seus dados

✅ **Candidatos:**
- Candidatos veem seus dados
- Empresas veem candidatos (para recrutamento)

✅ **Vagas:**
- Vagas ativas são públicas
- Empresas gerenciam apenas suas vagas

✅ **Candidaturas:**
- Candidatos veem suas candidaturas
- Empresas veem candidaturas de suas vagas

## 🧪 Testar o Setup

### 1. Criar usuário de teste

```sql
-- No SQL Editor do Supabase
-- Isso será feito automaticamente via signup no app
```

### 2. Inserir dados de teste

```sql
-- Inserir empresa de teste
INSERT INTO profiles (id, tipo, nome_completo, cidade, estado)
VALUES (auth.uid(), 'empresa', 'Empresa Teste', 'São Paulo', 'SP');

INSERT INTO empresas (id, nome_empresa, setor, tamanho, verificada)
VALUES (auth.uid(), 'Empresa Teste', 'Tecnologia', 'media', true);

-- Inserir vaga de teste
INSERT INTO vagas (
  empresa_id, titulo, descricao, tipo_contrato, modelo_trabalho,
  nivel, area, skills_requeridas
)
VALUES (
  auth.uid(),
  'Desenvolvedor Full Stack',
  'Vaga de teste',
  'clt',
  'remoto',
  'senior',
  'Tecnologia',
  ARRAY['React', 'Node.js']
);
```

## 📊 Monitoramento

### Logs

No Supabase Dashboard:
- **Logs** → **Database** - Ver queries SQL
- **Logs** → **Auth** - Ver tentativas de login
- **Logs** → **API** - Ver requests

### Métricas

- **Reports** - Ver uso de recursos
- **Database** → **Roles** - Gerenciar permissões

## 🚨 Troubleshooting

### Erro: "Invalid API key"
- Verifique se as variáveis de ambiente estão corretas
- Reinicie o servidor dev (`npm run dev`)

### Erro: "Row Level Security policy violation"
- Verifique se as policies foram criadas corretamente
- Use o SQL Editor para debugar: `SELECT * FROM profiles;`

### Erro: "relation does not exist"
- Execute o schema.sql completo
- Verifique se todas as tabelas foram criadas

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

## ✅ Checklist de Setup

- [ ] Projeto criado no Supabase
- [ ] Credenciais copiadas
- [ ] `.env.local` configurado
- [ ] Schema SQL executado
- [ ] Tabelas verificadas
- [ ] RLS policies ativas
- [ ] Teste de signup funcionando
- [ ] Teste de login funcionando
- [ ] Dashboard carregando dados reais

---

**Próximo passo:** Integrar autenticação real nas páginas de login/cadastro!
