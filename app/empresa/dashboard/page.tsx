"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Eye,
  UserCheck,
  Clock,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const stats = [
  {
    icon: Briefcase,
    label: "Vagas Ativas",
    value: "8",
    change: "+2",
    changeType: "positive" as const,
    color: "var(--primary-500)",
  },
  {
    icon: Users,
    label: "Candidatos Novos",
    value: "47",
    change: "+12",
    changeType: "positive" as const,
    color: "var(--secondary-500)",
  },
  {
    icon: Calendar,
    label: "Entrevistas Agendadas",
    value: "6",
    change: "+3",
    changeType: "positive" as const,
    color: "var(--accent-hot)",
  },
  {
    icon: TrendingUp,
    label: "Taxa de Conversão",
    value: "24%",
    change: "+5%",
    changeType: "positive" as const,
    color: "var(--success-500)",
  },
];

const activeJobs = [
  {
    id: "1",
    title: "Desenvolvedor Full Stack Sênior",
    candidates: 23,
    views: 156,
    status: "Ativa",
    daysActive: 5,
  },
  {
    id: "2",
    title: "UX Designer Pleno",
    candidates: 18,
    views: 89,
    status: "Ativa",
    daysActive: 3,
  },
  {
    id: "3",
    title: "Product Manager",
    candidates: 31,
    views: 203,
    status: "Ativa",
    daysActive: 7,
  },
];

const recentCandidates = [
  {
    id: "1",
    name: "Ana Carolina Silva",
    role: "Desenvolvedora Full Stack",
    match: 95,
    appliedTo: "Desenvolvedor Full Stack Sênior",
    appliedAt: "Há 2 horas",
  },
  {
    id: "2",
    name: "Rafael Mendes",
    role: "Product Manager",
    match: 88,
    appliedTo: "Product Manager",
    appliedAt: "Há 5 horas",
  },
  {
    id: "3",
    name: "Juliana Costa",
    role: "UX Designer",
    match: 92,
    appliedTo: "UX Designer Pleno",
    appliedAt: "Há 1 dia",
  },
];

export default function EmpresaDashboardPage() {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Bom dia"
      : currentHour < 18
      ? "Boa tarde"
      : "Boa noite";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto"
    >
      {/* Greeting */}
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-[var(--text-primary)]">{greeting}, </span>
          <span className="gradient-text-primary">TechCorp! 🚀</span>
        </h1>
        <p className="text-[var(--text-secondary)]">
          Aqui está um resumo do seu processo de recrutamento
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="glass rounded-2xl p-6 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                  stat.changeType === "positive"
                    ? "bg-[var(--success-glow)] text-[var(--success-500)]"
                    : "bg-[var(--danger-glow)] text-[var(--danger-500)]"
                }`}
              >
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-[var(--text-primary)] mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Jobs */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Vagas Ativas
            </h2>
            <Button variant="primary" size="sm">
              Ver todas
            </Button>
          </div>
          <div className="space-y-4">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="glass rounded-2xl p-6 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.daysActive} dias ativa
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--success-glow)] text-[var(--success-500)]">
                    {job.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--glass-border)]">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[var(--primary-500)]" />
                    <span className="text-sm">
                      <span className="font-semibold text-[var(--text-primary)]">
                        {job.candidates}
                      </span>{" "}
                      <span className="text-[var(--text-muted)]">candidatos</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[var(--secondary-500)]" />
                    <span className="text-sm">
                      <span className="font-semibold text-[var(--text-primary)]">
                        {job.views}
                      </span>{" "}
                      <span className="text-[var(--text-muted)]">visualizações</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Candidates */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Candidatos Recentes
          </h2>
          <div className="space-y-4">
            {recentCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="glass rounded-2xl p-4 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                    {candidate.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[var(--text-primary)] truncate">
                      {candidate.name}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] truncate">
                      {candidate.role}
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      candidate.match >= 90
                        ? "bg-[var(--success-glow)] text-[var(--success-500)]"
                        : "bg-[var(--primary-glow)] text-[var(--primary-500)]"
                    }`}
                  >
                    {candidate.match}%
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-2 line-clamp-1">
                  {candidate.appliedTo}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">
                    {candidate.appliedAt}
                  </span>
                  <Button variant="ghost" size="sm">
                    Ver perfil
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
