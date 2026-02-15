export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserType = "candidato" | "empresa";
export type ContractType = "clt" | "pj" | "estagio" | "freelancer";
export type WorkModel = "presencial" | "remoto" | "hibrido";
export type JobLevel = "estagio" | "junior" | "pleno" | "senior" | "lideranca";
export type JobStatus = "ativa" | "pausada" | "encerrada";
export type ApplicationStatus =
  | "enviada"
  | "em_analise"
  | "entrevista"
  | "aprovado"
  | "recusada";
export type CompanySize = "startup" | "pequena" | "media" | "grande";
export type Availability = "imediata" | "15dias" | "30dias" | "negociavel";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          tipo: UserType;
          nome_completo: string;
          avatar_url: string | null;
          telefone: string | null;
          cidade: string | null;
          estado: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          tipo: UserType;
          nome_completo: string;
          avatar_url?: string | null;
          telefone?: string | null;
          cidade?: string | null;
          estado?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tipo?: UserType;
          nome_completo?: string;
          avatar_url?: string | null;
          telefone?: string | null;
          cidade?: string | null;
          estado?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      empresas: {
        Row: {
          id: string;
          nome_empresa: string;
          cnpj: string | null;
          setor: string | null;
          tamanho: CompanySize | null;
          website: string | null;
          descricao: string | null;
          logo_url: string | null;
          verificada: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nome_empresa: string;
          cnpj?: string | null;
          setor?: string | null;
          tamanho?: CompanySize | null;
          website?: string | null;
          descricao?: string | null;
          logo_url?: string | null;
          verificada?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nome_empresa?: string;
          cnpj?: string | null;
          setor?: string | null;
          tamanho?: CompanySize | null;
          website?: string | null;
          descricao?: string | null;
          logo_url?: string | null;
          verificada?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      candidatos: {
        Row: {
          id: string;
          titulo_profissional: string | null;
          resumo: string | null;
          experiencia_anos: number | null;
          salario_pretendido: number | null;
          disponibilidade: Availability;
          curriculo_url: string | null;
          linkedin_url: string | null;
          github_url: string | null;
          portfolio_url: string | null;
          skills: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          titulo_profissional?: string | null;
          resumo?: string | null;
          experiencia_anos?: number | null;
          salario_pretendido?: number | null;
          disponibilidade?: Availability;
          curriculo_url?: string | null;
          linkedin_url?: string | null;
          github_url?: string | null;
          portfolio_url?: string | null;
          skills?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          titulo_profissional?: string | null;
          resumo?: string | null;
          experiencia_anos?: number | null;
          salario_pretendido?: number | null;
          disponibilidade?: Availability;
          curriculo_url?: string | null;
          linkedin_url?: string | null;
          github_url?: string | null;
          portfolio_url?: string | null;
          skills?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      vagas: {
        Row: {
          id: string;
          empresa_id: string;
          titulo: string;
          descricao: string;
          requisitos: string[] | null;
          beneficios: string[] | null;
          tipo_contrato: ContractType;
          modelo_trabalho: WorkModel;
          cidade: string | null;
          estado: string | null;
          salario_min: number | null;
          salario_max: number | null;
          mostra_salario: boolean;
          nivel: JobLevel;
          area: string | null;
          skills_requeridas: string[] | null;
          status: JobStatus;
          visualizacoes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          empresa_id: string;
          titulo: string;
          descricao: string;
          requisitos?: string[] | null;
          beneficios?: string[] | null;
          tipo_contrato: ContractType;
          modelo_trabalho: WorkModel;
          cidade?: string | null;
          estado?: string | null;
          salario_min?: number | null;
          salario_max?: number | null;
          mostra_salario?: boolean;
          nivel: JobLevel;
          area?: string | null;
          skills_requeridas?: string[] | null;
          status?: JobStatus;
          visualizacoes?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          empresa_id?: string;
          titulo?: string;
          descricao?: string;
          requisitos?: string[] | null;
          beneficios?: string[] | null;
          tipo_contrato?: ContractType;
          modelo_trabalho?: WorkModel;
          cidade?: string | null;
          estado?: string | null;
          salario_min?: number | null;
          salario_max?: number | null;
          mostra_salario?: boolean;
          nivel?: JobLevel;
          area?: string | null;
          skills_requeridas?: string[] | null;
          status?: JobStatus;
          visualizacoes?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      candidaturas: {
        Row: {
          id: string;
          vaga_id: string;
          candidato_id: string;
          status: ApplicationStatus;
          mensagem: string | null;
          curriculo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          vaga_id: string;
          candidato_id: string;
          status?: ApplicationStatus;
          mensagem?: string | null;
          curriculo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          vaga_id?: string;
          candidato_id?: string;
          status?: ApplicationStatus;
          mensagem?: string | null;
          curriculo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
