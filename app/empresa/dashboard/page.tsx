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
  MapPin,
  Clock,
  ArrowRight,
  Building2,
  FileText,
  Target,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { getEmpresaDashboardData } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/client";
import * as Avatar from "@radix-ui/react-avatar";

export default function EmpresaDashboard() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
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
    checkOnboarding();
  }, [loadDashboardData]);

  const checkOnboarding = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", user.id)
          .single();

        if (!(profile as any)?.onboarding_completed) {
          setShowOnboarding(true);
        }
      }
    } catch (error) {
      console.error("Error checking onboarding:", error);
    }
  };

  const handleOnboardingComplete = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await (supabase.from("profiles") as any)
          .update({ onboarding_completed: true })
          .eq("id", user.id);
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
    } finally {
      setShowOnboarding(false);
    }
  };

  const handleOnboardingSkip = async () => {
    await handleOnboardingComplete();
  };

  const nomeEmpresa = data.empresa?.nome_empresa || "Empresa";
  const vagasAtivas = data.vagas.filter((v) => v.status === "ativa").length;
  const totalCandidatos = data.candidaturas.length;
  const entrevistasHoje = data.candidaturas.filter(
    (c) => c.status === "entrevista"
  ).length;
  const taxaContratacao =
    totalCandidatos > 0
      ? Math.round(
          (data.candidaturas.filter((c) => c.status === "aprovada").length /
            totalCandidatos) *
            100
        )
      : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Content - 8 cols */}
      <div className="lg:col-span-8 space-y-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl p-8 overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Gerencie seus Talentos, {nomeEmpresa}! 🏢
              </h1>
              <p className="text-white/80 text-lg mb-6">
                Você tem {vagasAtivas} vagas ativas e {totalCandidatos}{" "}
                candidatos novos.
              </p>
              <Link href="/empresa/publicar-vaga">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90 rounded-full shadow-lg"
                >
                  <Plus className="mr-2 w-5 h-5" />
                  Publicar Nova Vaga
                </Button>
              </Link>
            </div>
            <Sparkles className="w-32 h-32 text-white/20 hidden md:block" />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Card 1 - Vagas Ativas */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  width="16"
                  height="4"
                  viewBox="0 0 16 4"
                  fill="currentColor"
                >
                  <circle cx="2" cy="2" r="2" />
                  <circle cx="8" cy="2" r="2" />
                  <circle cx="14" cy="2" r="2" />
                </svg>
              </button>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {vagasAtivas}
            </p>
            <p className="text-sm text-gray-500">Vagas Ativas</p>
          </motion.div>

          {/* Card 2 - Candidatos Novos */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  width="16"
                  height="4"
                  viewBox="0 0 16 4"
                  fill="currentColor"
                >
                  <circle cx="2" cy="2" r="2" />
                  <circle cx="8" cy="2" r="2" />
                  <circle cx="14" cy="2" r="2" />
                </svg>
              </button>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {totalCandidatos}
            </p>
            <p className="text-sm text-gray-500">Candidatos Novos</p>
          </motion.div>

          {/* Card 3 - Entrevistas Hoje */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  width="16"
                  height="4"
                  viewBox="0 0 16 4"
                  fill="currentColor"
                >
                  <circle cx="2" cy="2" r="2" />
                  <circle cx="8" cy="2" r="2" />
                  <circle cx="14" cy="2" r="2" />
                </svg>
              </button>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {entrevistasHoje}
            </p>
            <p className="text-sm text-gray-500">Entrevistas Hoje</p>
          </motion.div>

          {/* Card 4 - Taxa de Contratação */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  width="16"
                  height="4"
                  viewBox="0 0 16 4"
                  fill="currentColor"
                >
                  <circle cx="2" cy="2" r="2" />
                  <circle cx="8" cy="2" r="2" />
                  <circle cx="14" cy="2" r="2" />
                </svg>
              </button>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {taxaContratacao}%
            </p>
            <p className="text-sm text-gray-500">Taxa de Contratação</p>
          </motion.div>
        </motion.div>

        {/* Pipeline de Vagas */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Pipeline de Vagas
            </h2>
            <Link
              href="/empresa/vagas"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-50 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : data.vagas.length > 0 ? (
            <div className="space-y-3">
              {data.vagas.slice(0, 4).map((vaga: any) => (
                <div
                  key={vaga.id}
                  className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {vaga.titulo}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {vaga.cidade}, {vaga.estado}
                        </span>
                        <span>•</span>
                        <span>{vaga.modelo_trabalho}</span>
                        <span>•</span>
                        <span>{vaga.tipo_contrato.toUpperCase()}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vaga.status === "ativa"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {vaga.status === "ativa" ? "Ativa" : "Pausada"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {vaga.candidaturas_count || 0} candidatos
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(vaga.created_at).toLocaleDateString("pt-BR")}
                      </span>
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
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {vaga.candidaturas_count > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>
                          {Math.floor(vaga.candidaturas_count * 0.5)} em
                          análise
                        </span>
                        <span>
                          {Math.floor((vaga.candidaturas_count * 0.5) / vaga.candidaturas_count * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${Math.floor((vaga.candidaturas_count * 0.5) / vaga.candidaturas_count * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">
                Nenhuma vaga publicada ainda
              </p>
              <Link href="/empresa/publicar-vaga">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="mr-2 w-4 h-4" />
                  Publicar Vaga
                </Button>
              </Link>
            </div>
          )}
        </motion.div>

        {/* Candidatos Recentes */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Candidatos Recentes
            </h2>
            <Link
              href="/empresa/candidatos"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-50 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : data.candidaturas.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                      Candidato
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                      Vaga
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                      Match
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                      Data
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.candidaturas.slice(0, 5).map((candidatura: any) => (
                    <tr
                      key={candidatura.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar.Root className="w-10 h-10">
                            <Avatar.Fallback className="w-full h-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center rounded-full">
                              {candidatura.candidatos?.profiles?.nome_completo
                                ?.charAt(0)
                                .toUpperCase() || "?"}
                            </Avatar.Fallback>
                          </Avatar.Root>
                          <div>
                            <p className="font-medium text-gray-900">
                              {candidatura.candidatos?.profiles?.nome_completo ||
                                "Candidato"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {candidatura.candidatos?.titulo_profissional ||
                                "Profissional"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        {candidatura.vagas?.titulo || "Vaga"}
                      </td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {Math.floor(Math.random() * 20) + 75}%
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-500">
                        {new Date(candidatura.created_at).toLocaleDateString(
                          "pt-BR"
                        )}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="secondary" size="sm">
                            Ver Perfil
                          </Button>
                          <Button variant="secondary" size="sm">
                            Agendar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhum candidato ainda</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Right Sidebar - 4 cols */}
      <div className="lg:col-span-4 space-y-6">
        {/* Company Profile Card */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">
            {data.empresa?.nome_empresa || "Empresa"}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {data.empresa?.setor || "Tecnologia"}
          </p>
          <Link href="/empresa/perfil">
            <Button variant="secondary" className="w-full">
              Editar Perfil
            </Button>
          </Link>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="font-bold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="space-y-2">
            <Link href="/empresa/publicar-vaga">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors">
                <Plus className="w-5 h-5" />
                <span className="font-medium">Publicar Vaga</span>
              </button>
            </Link>
            <Link href="/empresa/relatorios">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                <FileText className="w-5 h-5" />
                <span className="font-medium">Ver Relatório</span>
              </button>
            </Link>
            <Link href="/empresa/configuracoes">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                <Target className="w-5 h-5" />
                <span className="font-medium">Configurar Filtros</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="font-bold text-gray-900 mb-4">Resumo do Mês</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Vagas Publicadas</span>
              <span className="text-lg font-bold text-gray-900">
                {data.vagas.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Candidaturas</span>
              <span className="text-lg font-bold text-gray-900">
                {totalCandidatos}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Contratações</span>
              <span className="text-lg font-bold text-gray-900">
                {data.candidaturas.filter((c) => c.status === "aprovada").length}
              </span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-900">
                Taxa de Sucesso
              </span>
              <span className="text-lg font-bold text-blue-600">
                {taxaContratacao}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal
          userType="empresa"
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
    </div>
  );
}
