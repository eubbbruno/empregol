"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Eye,
  TrendingUp,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VagaCard } from "@/components/cards/VagaCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { getCandidatoDashboardData } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

type Vaga = Database["public"]["Tables"]["vagas"]["Row"];
type Empresa = Database["public"]["Tables"]["empresas"]["Row"];

interface VagaWithEmpresa extends Vaga {
  empresas: Empresa | null;
}

// Helper functions
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

function getStatusBadge(status: string) {
  const badges = {
    enviada: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Enviada", icon: Clock },
    em_analise: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Em Análise", icon: AlertCircle },
    entrevista: { color: "bg-green-100 text-green-700 border-green-200", label: "Entrevista", icon: Calendar },
    aprovada: { color: "bg-green-100 text-green-800 border-green-300", label: "Aprovado", icon: CheckCircle2 },
    recusada: { color: "bg-red-100 text-red-700 border-red-200", label: "Recusada", icon: XCircle },
  };

  return badges[status as keyof typeof badges] || badges.enviada;
}

export default function CandidatoDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    profile: any;
    candidato: any;
    candidaturas: any[];
    vagasRecomendadas: VagaWithEmpresa[];
  }>({
    profile: null,
    candidato: null,
    candidaturas: [],
    vagasRecomendadas: [],
  });

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const dashboardData = await getCandidatoDashboardData(user.id);
        setData({
          profile: dashboardData.profile,
          candidato: dashboardData.candidato,
          candidaturas: dashboardData.candidaturas,
          vagasRecomendadas: dashboardData.vagasRecomendadas as VagaWithEmpresa[],
        });
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const nomeUsuario = data.profile?.nome_completo?.split(" ")[0] || "Usuário";
  const candidaturasCount = data.candidaturas.length;
  const perfilCompleto = data.candidato?.skills?.length > 0 ? 85 : 45;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Welcome Banner */}
          <motion.div
            variants={fadeInUp}
            className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-white mb-2">
                Bem-vindo de volta, {nomeUsuario}! 👋
              </h1>
              <p className="text-green-50 text-lg">
                Continue sua busca pelo emprego ideal
              </p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Candidaturas Enviadas */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">{candidaturasCount}</p>
                <p className="text-sm text-gray-600">Candidaturas Enviadas</p>
                <p className="text-xs text-gray-500">este mês</p>
              </div>
            </div>

            {/* Vagas Visualizadas */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Vagas Visualizadas</p>
                <p className="text-xs text-gray-500">últimos 7 dias</p>
              </div>
            </div>

            {/* Perfil Completo */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-3xl font-bold text-gray-900">{perfilCompleto}%</p>
                <p className="text-sm text-gray-600">Perfil Completo</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${perfilCompleto}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vagas Recomendadas */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Vagas Recomendadas para Você
              </h2>
              <Link href="/vagas">
                <Button variant="secondary" className="gap-2">
                  Ver Todas
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse"
                  >
                    <div className="h-12 bg-gray-200 rounded-lg mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : data.vagasRecomendadas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.vagasRecomendadas.map((vaga) => (
                  <VagaCard
                    key={vaga.id}
                    id={vaga.id}
                    titulo={vaga.titulo}
                    empresa={vaga.empresas?.nome_empresa || "Empresa"}
                    cidade={vaga.cidade || ""}
                    estado={vaga.estado || ""}
                    salario_min={vaga.salario_min}
                    salario_max={vaga.salario_max}
                    tipo={mapTipoContrato(vaga.tipo_contrato)}
                    nivel={mapNivel(vaga.nivel)}
                    modelo={vaga.modelo_trabalho}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhuma vaga recomendada ainda
                </h3>
                <p className="text-gray-600 mb-6">
                  Complete seu perfil para receber recomendações personalizadas
                </p>
                <Link href="/dashboard/perfil">
                  <Button>Completar Perfil</Button>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Candidaturas Recentes */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Minhas Candidaturas
            </h2>

            {loading ? (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 animate-pulse">
                      <div className="h-12 w-12 bg-gray-200 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-3 bg-gray-200 rounded w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : data.candidaturas.length > 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Vaga
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Empresa
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.candidaturas.map((candidatura: any) => {
                        const badge = getStatusBadge(candidatura.status);
                        const Icon = badge.icon;
                        return (
                          <tr
                            key={candidatura.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <Link
                                href={`/vagas/${candidatura.vaga_id}`}
                                className="font-medium text-gray-900 hover:text-green-600"
                              >
                                {candidatura.vagas?.titulo || "Vaga"}
                              </Link>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {candidatura.vagas?.empresas?.nome_empresa || "Empresa"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {new Date(candidatura.created_at).toLocaleDateString("pt-BR")}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                {badge.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Você ainda não se candidatou a nenhuma vaga
                </h3>
                <p className="text-gray-600 mb-6">
                  Explore vagas disponíveis e candidate-se às que mais combinam com você
                </p>
                <Link href="/vagas">
                  <Button>Explorar Vagas</Button>
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
