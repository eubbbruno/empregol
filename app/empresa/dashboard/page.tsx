"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  Plus,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const stats = [
  {
    icon: Briefcase,
    label: "Vagas Ativas",
    value: "0",
    change: "+0%",
    changeType: "neutral" as const,
    color: "purple",
  },
  {
    icon: Users,
    label: "Novos Candidatos",
    value: "0",
    change: "+0%",
    changeType: "neutral" as const,
    color: "cyan",
  },
  {
    icon: Calendar,
    label: "Entrevistas Agendadas",
    value: "0",
    change: "+0%",
    changeType: "neutral" as const,
    color: "orange",
  },
  {
    icon: TrendingUp,
    label: "Taxa de Conversão",
    value: "0%",
    change: "+0%",
    changeType: "neutral" as const,
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

export default function EmpresaDashboardPage() {
  const greeting = `Bem-vindo de volta!`;
  const hasData = false; // TODO: Verificar se tem dados do Supabase

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Greeting */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{greeting}</h1>
        <p className="text-gray-600">
          Gerencie suas vagas e acompanhe candidatos
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                {stat.changeType !== "neutral" && (
                  <span
                    className={`text-sm font-semibold ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {!hasData && (
        <motion.div variants={fadeInUp}>
          <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-200 text-center">
            <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Publique sua primeira vaga
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Comece a atrair os melhores talentos para sua empresa. É rápido e
              fácil!
            </p>
            <Button
              size="lg"
              className="bg-gradient-cta text-white shadow-md inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Criar Nova Vaga
            </Button>
          </div>
        </motion.div>
      )}

      {/* Active Jobs - quando tiver dados */}
      {hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Jobs */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Vagas Ativas</h2>
              <Button
                size="sm"
                className="bg-gradient-cta text-white shadow-md"
              >
                <Plus className="w-4 h-4" />
                Nova Vaga
              </Button>
            </div>
            <div className="space-y-4">
              {/* Job cards aqui */}
            </div>
          </motion.div>

          {/* Recent Candidates */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Candidatos Recentes
            </h2>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="space-y-4">
                {/* Candidate items aqui */}
                <p className="text-gray-500 text-sm text-center py-8">
                  Nenhum candidato ainda
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
