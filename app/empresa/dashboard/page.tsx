"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Calendar, Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";

interface Stats {
  vagasAtivas: number;
  candidatosRecebidos: number;
  entrevistasAgendadas: number;
}

export default function EmpresaDashboardPage() {
  const [companyName, setCompanyName] = useState("Empresa");
  const [stats, setStats] = useState<Stats>({
    vagasAtivas: 0,
    candidatosRecebidos: 0,
    entrevistasAgendadas: 0,
  });
  const [vagas, setVagas] = useState<any[]>([]);
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
        // Get company profile
        const { data: empresa } = await supabase
          .from("empresas")
          .select("nome_empresa")
          .eq("id", user.id)
          .single();

        if (empresa) {
          setCompanyName(empresa.nome_empresa);
        }

        // Get vagas count
        const { count: vagasCount } = await supabase
          .from("vagas")
          .select("*", { count: "exact", head: true })
          .eq("empresa_id", user.id)
          .eq("status", "ativa");

        // Get candidatos count
        const { count: candidatosCount } = await supabase
          .from("candidaturas")
          .select("vagas!inner(*)", { count: "exact", head: true })
          .eq("vagas.empresa_id", user.id);

        setStats({
          vagasAtivas: vagasCount || 0,
          candidatosRecebidos: candidatosCount || 0,
          entrevistasAgendadas: 0,
        });

        // Get company jobs
        const { data: vagasData } = await supabase
          .from("vagas")
          .select("*")
          .eq("empresa_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        if (vagasData) {
          // Get candidaturas count for each vaga
          const vagasWithCount = await Promise.all(
            vagasData.map(async (vaga) => {
              const { count } = await supabase
                .from("candidaturas")
                .select("*", { count: "exact", head: true })
                .eq("vaga_id", vaga.id);

              return { ...vaga, candidaturas_count: count || 0 };
            })
          );

          setVagas(vagasWithCount);
        }
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsConfig = [
    {
      icon: Briefcase,
      label: "Vagas Ativas",
      value: stats.vagasAtivas.toString(),
      color: "purple",
    },
    {
      icon: Users,
      label: "Candidatos Recebidos",
      value: stats.candidatosRecebidos.toString(),
      color: "cyan",
    },
    {
      icon: Calendar,
      label: "Entrevistas Agendadas",
      value: stats.entrevistasAgendadas.toString(),
      color: "orange",
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
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard - {companyName}
          </h1>
          <p className="text-gray-600">
            Gerencie suas vagas e acompanhe candidaturas
          </p>
        </div>
        <a href="/empresa/publicar-vaga">
          <Button size="lg" className="bg-gradient-primary text-white shadow-md">
            <Plus className="w-5 h-5" />
            Publicar Vaga
          </Button>
        </a>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

      {/* Jobs List or Empty State */}
      {vagas.length === 0 ? (
        <motion.div variants={fadeInUp}>
          <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-200 text-center">
            <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Nenhuma vaga publicada
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Comece a atrair os melhores talentos publicando sua primeira vaga!
            </p>
            <a href="/empresa/publicar-vaga">
              <Button
                size="lg"
                className="bg-gradient-primary text-white shadow-md"
              >
                <Plus className="w-5 h-5" />
                Publicar Primeira Vaga
              </Button>
            </a>
          </div>
        </motion.div>
      ) : (
        <motion.div variants={fadeInUp}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Minhas Vagas</h2>
            <a
              href="/empresa/vagas"
              className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1"
            >
              Ver todas
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-4">
            {vagas.map((vaga) => (
              <div
                key={vaga.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {vaga.titulo}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          vaga.status === "ativa"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {vaga.status === "ativa" ? "Ativa" : "Pausada"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>{vaga.tipo_contrato.toUpperCase()}</span>
                      <span>•</span>
                      <span>{vaga.modelo_trabalho}</span>
                      <span>•</span>
                      <span>
                        {vaga.cidade}, {vaga.estado}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 font-semibold">
                          {vaga.candidaturas_count}
                        </span>
                        <span className="text-gray-600">candidatos</span>
                      </div>
                      <div className="text-gray-500">
                        Publicada há{" "}
                        {Math.floor(
                          (Date.now() - new Date(vaga.created_at).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        dias
                      </div>
                    </div>
                  </div>
                  <a
                    href={`/vagas/${vaga.id}`}
                    className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1"
                  >
                    Ver detalhes
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
