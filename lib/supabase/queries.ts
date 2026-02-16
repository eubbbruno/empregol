import { createClient } from "./client";
import { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Candidato = Database["public"]["Tables"]["candidatos"]["Row"];
type Empresa = Database["public"]["Tables"]["empresas"]["Row"];
type Vaga = Database["public"]["Tables"]["vagas"]["Row"];

export async function getCandidatoDashboardData(userId: string) {
  const supabase = createClient();

  try {
    const [profileResult, candidatoResult, candidaturasResult, vagasResult] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).single(),
        supabase.from("candidatos").select("*").eq("id", userId).single(),
        supabase
          .from("candidaturas")
          .select("*, vagas(*, empresas(*))")
          .eq("candidato_id", userId)
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("vagas")
          .select("*, empresas(*)")
          .eq("status", "ativa")
          .order("created_at", { ascending: false })
          .limit(6),
      ]);

    return {
      profile: profileResult.data as Profile | null,
      candidato: candidatoResult.data as Candidato | null,
      candidaturas: candidaturasResult.data || [],
      vagasRecomendadas: vagasResult.data || [],
      error: null,
    };
  } catch (error) {
    console.error("Error fetching candidate dashboard data:", error);
    return {
      profile: null,
      candidato: null,
      candidaturas: [],
      vagasRecomendadas: [],
      error: error as Error,
    };
  }
}

export async function getEmpresaDashboardData(userId: string) {
  const supabase = createClient();

  try {
    const [profileResult, empresaResult, vagasResult, candidaturasResult] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).single(),
        supabase.from("empresas").select("*").eq("id", userId).single(),
        supabase
          .from("vagas")
          .select("*")
          .eq("empresa_id", userId)
          .order("created_at", { ascending: false }),
        supabase
          .from("candidaturas")
          .select("*, vagas!inner(empresa_id), candidatos(*, profiles(*))")
          .eq("vagas.empresa_id", userId)
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

    // Count candidaturas for each vaga
    const vagasWithCounts = await Promise.all(
      (vagasResult.data || []).map(async (vaga: Vaga) => {
        const { count } = await supabase
          .from("candidaturas")
          .select("*", { count: "exact", head: true })
          .eq("vaga_id", vaga.id);

        return {
          ...vaga,
          candidaturas_count: count || 0,
        };
      })
    );

    return {
      profile: profileResult.data as Profile | null,
      empresa: empresaResult.data as Empresa | null,
      vagas: vagasWithCounts,
      candidaturas: candidaturasResult.data || [],
      error: null,
    };
  } catch (error) {
    console.error("Error fetching empresa dashboard data:", error);
    return {
      profile: null,
      empresa: null,
      vagas: [],
      candidaturas: [],
      error: error as Error,
    };
  }
}

export async function getVagasWithFilters(filters: {
  search?: string;
  tipo_contrato?: string;
  modelo_trabalho?: string;
  nivel?: string;
  cidade?: string;
  salario_min?: number;
  salario_max?: number;
  area?: string;
}) {
  const supabase = createClient();

  let query = supabase
    .from("vagas")
    .select("*, empresas(*)")
    .eq("status", "ativa");

  if (filters.search) {
    query = query.or(
      `titulo.ilike.%${filters.search}%,descricao.ilike.%${filters.search}%`
    );
  }

  if (filters.tipo_contrato) {
    query = query.eq("tipo_contrato", filters.tipo_contrato);
  }

  if (filters.modelo_trabalho) {
    query = query.eq("modelo_trabalho", filters.modelo_trabalho);
  }

  if (filters.nivel) {
    query = query.eq("nivel", filters.nivel);
  }

  if (filters.cidade) {
    query = query.ilike("cidade", `%${filters.cidade}%`);
  }

  if (filters.salario_min) {
    query = query.gte("salario_min", filters.salario_min);
  }

  if (filters.salario_max) {
    query = query.lte("salario_max", filters.salario_max);
  }

  if (filters.area) {
    query = query.eq("area", filters.area);
  }

  const { data, error } = await query.order("created_at", {
    ascending: false,
  });

  return {
    vagas: data || [],
    error,
  };
}
