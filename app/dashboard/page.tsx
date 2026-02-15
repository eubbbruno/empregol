"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Eye,
  Mail,
  Target,
  ArrowUpRight,
  Briefcase,
} from "lucide-react";
import { VagaCard } from "@/components/cards/VagaCard";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

type Vaga = Database["public"]["Tables"]["vagas"]["Row"];
type Empresa = Database["public"]["Tables"]["empresas"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface VagaWithEmpresa extends Vaga {
  empresas: Empresa | null;
}

interface Stats {
  candidaturasAtivas: number;
  visualizacoes: number;
  convites: number;
  profileScore: number;
}

// Helper functions to map database types to UI types
function mapTipoContrato(tipo: string): "CLT" | "PJ" | "Estágio" | "Freelancer" {
  const tipoUpper = tipo.toUpperCase();
  if (tipoUpper === "ESTAGIO") return "Estágio";
  if (tipoUpper === "TEMPORARIO") return "Freelancer";
  return tipoUpper as "CLT" | "PJ";
}

function mapNivel(nivel: string): "Estágio" | "Júnior" | "Pleno" | "Sênior" | "Liderança" {
  if (nivel === "estagio") return "Estágio";
  if (nivel === "junior") return "Júnior";
  if (nivel === "pleno") return "Pleno";
  if (nivel === "senior") return "Sênior";
  if (nivel === "especialista") return "Liderança";
  return "Júnior";
}

export default function DashboardPage() {
  const [userName, setUserName] = useState("Usuário");
  const [stats, setStats] = useState<Stats>({
    candidaturasAtivas: 0,
    visualizacoes: 0,
    convites: 0,
    profileScore: 0,
  });
  const [vagas, setVagas] = useState<VagaWithEmpresa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const supabase = createClient();

      // Get user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Get profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("nome_completo")
          .eq("id", user.id)
          .single();

        if (profile) {
          const profileData = profile as Profile;
          setUserName(profileData.nome_completo || "Usuário");
        }

        // Get candidaturas count
        const { count: candidaturasCount } = await supabase
          .from("candidaturas")
          .select("*", { count: "exact", head: true })
          .eq("candidato_id", user.id)
          .in("status", ["enviada", "em_analise", "entrevista"]);

        setStats((prev) => ({
          ...prev,
          candidaturasAtivas: candidaturasCount || 0,
        }));

        // Get recommended jobs
        const { data: vagasData } = await supabase
          .from("vagas")
          .select(
            `
            *,
            empresas (
              nome_empresa,
              logo_url,
              verificada
            )
          `
          )
          .eq("status", "ativa")
          .order("created_at", { ascending: false })
          .limit(6);

        if (vagasData) {
          setVagas(vagasData as VagaWithEmpresa[]);
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error loading dashboard";
      console.error(message);
    } finally {
      setLoading(false);
    }
  };

  const statsConfig = [
    {
      icon: Briefcase,
      label: "Candidaturas Ativas",
      value: stats.candidaturasAtivas.toString(),
      color: "purple",
    },
    {
      icon: Eye,
      label: "Visualizações do Perfil",
      value: stats.visualizacoes.toString(),
      color: "cyan",
    },
    {
      icon: Mail,
      label: "Convites Recebidos",
      value: stats.convites.toString(),
      color: "orange",
    },
    {
      icon: Target,
      label: "Score do Perfil",
      value: `${stats.profileScore}%`,
      color: "green",
    },
  ];

  const colorClasses = {
    purple: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      border: "border-purple-200",
    },
    cyan: {
      bg: "bg-cyan-50",
      icon: "text-cyan-600",
      border: "border-cyan-200",
    },
    orange: {
      bg: "bg-orange-50",
      icon: "text-orange-600",
      border: "border-orange-200",
    },
    green: {
      bg: "bg-green-50",
      icon: "text-green-600",
      border: "border-green-200",
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Greeting */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bem-vindo de volta, {userName}!
        </h1>
        <p className="text-gray-600">
          Aqui está um resumo da sua atividade recente
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon;
          const colors = colorClasses[stat.color as keyof typeof colorClasses];

          return (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className={`bg-white rounded-2xl p-6 border-2 ${colors.border} shadow-sm hover:shadow-md transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Chart */}
      <motion.div variants={fadeInUp}>
        <ActivityChart />
      </motion.div>

      {/* Recommended Jobs or Empty State */}
      {vagas.length === 0 ? (
        <motion.div variants={fadeInUp}>
          <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-200 text-center">
            <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Nenhuma candidatura ainda
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Comece a explorar vagas e candidate-se às oportunidades que
              combinam com você!
            </p>
            <Link
              href="/vagas"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              Explorar Vagas
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommended Jobs */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Vagas Recomendadas
              </h2>
              <Link
                href="/vagas"
                className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1"
              >
                Ver todas
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {vagas.slice(0, 3).map((vaga) => (
                <VagaCard
                  key={vaga.id}
                  titulo={vaga.titulo}
                  empresa={vaga.empresas?.nome_empresa || "Empresa"}
                  logoEmpresa={vaga.empresas?.logo_url || undefined}
                  localizacao={`${vaga.cidade || ""}, ${vaga.estado || ""}`.trim()}
                  tipo={mapTipoContrato(vaga.tipo_contrato)}
                  nivel={mapNivel(vaga.nivel)}
                  salario={
                    vaga.mostra_salario && vaga.salario_min
                      ? `R$ ${vaga.salario_min.toLocaleString()} - R$ ${vaga.salario_max?.toLocaleString()}`
                      : "A combinar"
                  }
                  remoto={vaga.modelo_trabalho === "remoto"}
                  publicadoEm={new Date(vaga.created_at)}
                  tags={vaga.skills_requeridas || []}
                  verificada={vaga.empresas?.verificada || false}
                />
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Atividade Recente
            </h2>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <p className="text-gray-500 text-sm text-center py-8">
                Nenhuma atividade recente
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
