"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Eye,
  UserPlus,
  MapPin,
  Clock,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { getCandidatoDashboardData } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";
import * as Avatar from "@radix-ui/react-avatar";
import * as Progress from "@radix-ui/react-progress";


type Vaga = Database["public"]["Tables"]["vagas"]["Row"];
type Empresa = Database["public"]["Tables"]["empresas"]["Row"];

interface VagaWithEmpresa extends Vaga {
  empresas: Empresa | null;
}

function getStatusBadge(status: string) {
  const badges = {
    enviada: {
      color: "bg-yellow-50 text-yellow-700 border-yellow-200",
      label: "Enviada",
      icon: Clock,
    },
    em_analise: {
      color: "bg-blue-50 text-blue-700 border-blue-200",
      label: "Em Análise",
      icon: AlertCircle,
    },
    entrevista: {
      color: "bg-green-50 text-green-700 border-green-200",
      label: "Entrevista",
      icon: Calendar,
    },
    aprovada: {
      color: "bg-emerald-100 text-emerald-700 border-emerald-300",
      label: "Aprovado",
      icon: CheckCircle2,
    },
    recusada: {
      color: "bg-red-50 text-red-700 border-red-200",
      label: "Recusada",
      icon: XCircle,
    },
  };

  return (
    badges[status as keyof typeof badges] || badges.enviada
  );
}

// Dados mockados para o gráfico
const activityData = [
  { name: "Sem 1", value: 8 },
  { name: "Sem 2", value: 12 },
  { name: "Sem 3", value: 6 },
  { name: "Sem 4", value: 15 },
];

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
          vagasRecomendadas:
            dashboardData.vagasRecomendadas as VagaWithEmpresa[],
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

  const nomeUsuario =
    data.profile?.nome_completo?.split(" ")[0] || "Usuário";
  const candidaturasCount = data.candidaturas.length;
  const perfilCompleto = data.candidato?.skills?.length > 0 ? 85 : 45;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Content - 8 cols */}
      <div className="lg:col-span-8 space-y-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-green-500 to-green-400 rounded-2xl p-8 overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Seu Próximo Gol Profissional
              </h1>
              <p className="text-white/80 text-lg mb-6">
                Continue sua busca. Você tem {candidaturasCount} candidaturas
                ativas.
              </p>
              <Link href="/vagas">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-white/90 rounded-full shadow-lg"
                >
                  Explorar Vagas
                  <ArrowRight className="ml-2 w-5 h-5" />
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
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Card 1 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
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
              {candidaturasCount}
            </p>
            <p className="text-sm text-gray-500 mb-2">Candidaturas Ativas</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 3 esta semana</span>
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
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
            <p className="text-3xl font-bold text-gray-900 mb-1">142</p>
            <p className="text-sm text-gray-500 mb-2">Visualizações do Perfil</p>
            <p className="text-xs text-blue-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 12 esta semana</span>
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-orange-600" />
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
            <p className="text-3xl font-bold text-gray-900 mb-1">7</p>
            <p className="text-sm text-gray-500 mb-2">Convites Recebidos</p>
            <p className="text-xs text-orange-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 2 esta semana</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Vagas Recomendadas */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Vagas Recomendadas
            </h2>
            <Link
              href="/vagas"
              className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl h-48 animate-pulse"
                />
              ))}
            </div>
          ) : data.vagasRecomendadas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.vagasRecomendadas.slice(0, 3).map((vaga) => (
                <Link
                  key={vaga.id}
                  href={`/vagas/${vaga.id}`}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl h-32 mb-3 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white text-green-700 text-xs font-semibold rounded-full shadow-sm">
                        TECNOLOGIA
                      </span>
                    </div>
                    <Briefcase className="w-12 h-12 text-green-600/20" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors line-clamp-2">
                    {vaga.titulo}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                    {vaga.empresas?.nome_empresa || "Empresa"}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {vaga.cidade}, {vaga.estado}
                  </p>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-green-500 h-1.5 rounded-full"
                        style={{ width: "85%" }}
                      />
                    </div>
                    <p className="text-xs text-green-600 font-medium mt-1">
                      85% match
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhuma vaga recomendada ainda</p>
            </div>
          )}
        </motion.div>

        {/* Candidaturas Recentes */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Suas Candidaturas
            </h2>
            <Link
              href="/dashboard/candidaturas"
              className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1"
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
                      Vaga
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                      Empresa
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                      Data
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                      Status
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.candidaturas.slice(0, 5).map((candidatura: any) => {
                    const badge = getStatusBadge(candidatura.status);
                    const Icon = badge.icon;
                    return (
                      <tr
                        key={candidatura.id}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-4">
                          <Link
                            href={`/vagas/${candidatura.vaga_id}`}
                            className="font-medium text-gray-900 hover:text-green-600"
                          >
                            {candidatura.vagas?.titulo || "Vaga"}
                          </Link>
                        </td>
                        <td className="py-4 text-sm text-gray-600">
                          {candidatura.vagas?.empresas?.nome_empresa ||
                            "Empresa"}
                        </td>
                        <td className="py-4 text-sm text-gray-500">
                          {new Date(
                            candidatura.created_at
                          ).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {badge.label}
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ArrowUpRight className="w-4 h-4 text-gray-400" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">
                Você ainda não se candidatou a nenhuma vaga
              </p>
              <Link href="/vagas">
                <Button>Explorar Vagas</Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* Right Sidebar - 4 cols */}
      <div className="lg:col-span-4 space-y-6">
        {/* Profile Card */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
        >
          <Avatar.Root className="w-20 h-20 mx-auto mb-4">
            <Avatar.Fallback className="w-full h-full bg-green-100 text-green-600 font-bold text-2xl flex items-center justify-center rounded-full border-4 border-green-200">
              {nomeUsuario.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
          <h3 className="font-bold text-gray-900 mb-1">
            {data.profile?.nome_completo || "Usuário"}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {data.candidato?.titulo_profissional || "Profissional"}
          </p>

          {/* Circular Progress */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#22C55E"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(perfilCompleto / 100) * 352} 352`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {perfilCompleto}%
                </p>
                <p className="text-xs text-gray-500">Completo</p>
              </div>
            </div>
          </div>

          <Link href="/dashboard/perfil">
            <Button variant="secondary" className="w-full">
              Completar Perfil
            </Button>
          </Link>
        </motion.div>

        {/* Activity Chart */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="font-bold text-gray-900 mb-6">Atividade</h3>
          <div className="h-48 flex items-end justify-around gap-2 px-4">
            {activityData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-green-500 rounded-t-lg transition-all duration-300 hover:bg-green-600"
                  style={{ height: `${(item.value / 20) * 100}%` }}
                />
                <span className="text-xs text-gray-500">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tasks Card */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="font-bold text-gray-900 mb-4">Complete seu Perfil</h3>
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm text-gray-600">Adicionar foto</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm text-gray-600">
                Preencher experiência
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded-md flex-shrink-0" />
              <span className="text-sm text-gray-400">Adicionar skills</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded-md flex-shrink-0" />
              <span className="text-sm text-gray-400">Enviar currículo</span>
            </div>
          </div>
          <Progress.Root
            className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2"
            value={50}
          >
            <Progress.Indicator
              className="bg-green-500 w-full h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${100 - 50}%)` }}
            />
          </Progress.Root>
          <p className="text-xs text-gray-500 mt-2">2 de 4 completo</p>
        </motion.div>
      </div>
    </div>
  );
}
