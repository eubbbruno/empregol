"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Pause,
  Play,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { getEmpresaDashboardData } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/client";

export default function EmpresaDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    profile: any;
    empresa: any;
    vagas: any[];
    candidaturas: any[];
  }>({
    profile: null,
    empresa: null,
    vagas: [],
    candidaturas: [],
  });

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const dashboardData = await getEmpresaDashboardData(user.id);
        setData({
          profile: dashboardData.profile,
          empresa: dashboardData.empresa,
          vagas: dashboardData.vagas,
          candidaturas: dashboardData.candidaturas,
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

  const nomeEmpresa = data.empresa?.nome_empresa || "Empresa";
  const vagasAtivas = data.vagas.filter((v) => v.status === "ativa").length;
  const totalCandidatos = data.candidaturas.length;
  const entrevistasAgendadas = data.candidaturas.filter(
    (c) => c.status === "entrevista"
  ).length;
  const taxaConversao =
    totalCandidatos > 0
      ? Math.round(
          (data.candidaturas.filter((c) => c.status === "aprovada").length /
            totalCandidatos) *
            100
        )
      : 0;

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
                Olá, {nomeEmpresa}! 🏢
              </h1>
              <p className="text-green-50 text-lg">
                Gerencie suas vagas e encontre os melhores talentos
              </p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Vagas Ativas */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">{vagasAtivas}</p>
                <p className="text-sm text-gray-600">Vagas Ativas</p>
              </div>
            </div>

            {/* Total de Candidatos */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">{totalCandidatos}</p>
                <p className="text-sm text-gray-600">Total de Candidatos</p>
              </div>
            </div>

            {/* Entrevistas Agendadas */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">{entrevistasAgendadas}</p>
                <p className="text-sm text-gray-600">Entrevistas Agendadas</p>
              </div>
            </div>

            {/* Taxa de Conversão */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">{taxaConversao}%</p>
                <p className="text-sm text-gray-600">Taxa de Conversão</p>
              </div>
            </div>
          </motion.div>

          {/* Minhas Vagas */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Minhas Vagas</h2>
              <Link href="/empresa/publicar-vaga">
                <Button className="bg-gradient-primary gap-2">
                  <Plus className="w-4 h-4" />
                  Publicar Nova Vaga
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 animate-pulse">
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-3 bg-gray-200 rounded w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : data.vagas.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {data.vagas.map((vaga: any) => (
                  <div
                    key={vaga.id}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {vaga.titulo}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              vaga.status === "ativa"
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-gray-100 text-gray-700 border border-gray-200"
                            }`}
                          >
                            {vaga.status === "ativa" ? "Ativa" : "Pausada"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {vaga.cidade}, {vaga.estado}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(vaga.created_at).toLocaleDateString("pt-BR")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {vaga.candidaturas_count || 0} candidatos
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/vagas/${vaga.id}`}>
                          <Button variant="secondary" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Ver
                          </Button>
                        </Link>
                        <Button variant="secondary" size="sm" className="gap-2">
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button variant="secondary" size="sm">
                          {vaga.status === "ativa" ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhuma vaga publicada ainda
                </h3>
                <p className="text-gray-600 mb-6">
                  Publique sua primeira vaga e comece a receber candidatos
                </p>
                <Link href="/empresa/publicar-vaga">
                  <Button className="bg-gradient-primary gap-2">
                    <Plus className="w-4 h-4" />
                    Publicar Vaga
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Candidatos Recentes */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Candidatos Recentes
              </h2>
            </div>

            {loading ? (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 animate-pulse">
                      <div className="h-12 w-12 bg-gray-200 rounded-full" />
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
                          Candidato
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Vaga
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.candidaturas.slice(0, 5).map((candidatura: any) => (
                        <tr
                          key={candidatura.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-green-600">
                                  {candidatura.candidatos?.profiles?.nome_completo
                                    ?.charAt(0)
                                    .toUpperCase() || "?"}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {candidatura.candidatos?.profiles?.nome_completo ||
                                    "Candidato"}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {candidatura.candidatos?.titulo_profissional ||
                                    "Profissional"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {candidatura.vagas?.titulo || "Vaga"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(candidatura.created_at).toLocaleDateString(
                              "pt-BR"
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="secondary" size="sm" className="gap-2">
                              Ver Perfil
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum candidato ainda
                </h3>
                <p className="text-gray-600">
                  Publique vagas para começar a receber candidaturas
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
