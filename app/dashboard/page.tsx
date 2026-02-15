"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Eye,
  Mail,
  Target,
  ArrowUpRight,
  Briefcase,
  Clock,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { VagaCard } from "@/components/cards/VagaCard";

const stats = [
  {
    icon: Briefcase,
    label: "Candidaturas Ativas",
    value: "12",
    change: "+3",
    changeType: "positive" as const,
    color: "var(--primary-500)",
  },
  {
    icon: Eye,
    label: "Visualizações do Perfil",
    value: "248",
    change: "+18%",
    changeType: "positive" as const,
    color: "var(--secondary-500)",
  },
  {
    icon: Mail,
    label: "Convites Recebidos",
    value: "5",
    change: "+2",
    changeType: "positive" as const,
    color: "var(--accent-hot)",
  },
  {
    icon: Target,
    label: "Score do Perfil",
    value: "87%",
    change: "+5%",
    changeType: "positive" as const,
    color: "var(--success-500)",
  },
];

const recentApplications = [
  {
    id: "1",
    titulo: "Desenvolvedor Full Stack Sênior",
    empresa: "TechCorp Brasil",
    status: "Em análise",
    statusColor: "var(--secondary-500)",
    appliedAt: "Há 2 dias",
  },
  {
    id: "2",
    titulo: "Tech Lead React",
    empresa: "StartupXYZ",
    status: "Entrevista agendada",
    statusColor: "var(--accent-hot)",
    appliedAt: "Há 5 dias",
  },
  {
    id: "3",
    titulo: "Engenheiro de Software",
    empresa: "CloudTech",
    status: "Enviada",
    statusColor: "var(--text-muted)",
    appliedAt: "Há 1 semana",
  },
];

const recommendedJobs = [
  {
    id: "1",
    titulo: "Senior Frontend Developer",
    empresa: "TechFlow",
    localizacao: "São Paulo, SP",
    tipo: "CLT" as const,
    nivel: "Sênior" as const,
    salario: { min: 15000, max: 22000 },
    remoto: true,
    publicadoEm: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    tags: ["React", "TypeScript", "Next.js"],
    matchScore: 95,
    verificada: true,
  },
  {
    id: "2",
    titulo: "Full Stack Engineer",
    empresa: "InnovaHub",
    localizacao: "Remoto",
    tipo: "PJ" as const,
    nivel: "Sênior" as const,
    salario: { min: 18000, max: 25000 },
    remoto: true,
    publicadoEm: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    tags: ["Node.js", "React", "AWS"],
    matchScore: 92,
    verificada: true,
  },
];

export default function DashboardPage() {
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
          <span className="gradient-text-primary">João! 🎯</span>
        </h1>
        <p className="text-[var(--text-secondary)]">
          Aqui está um resumo da sua jornada profissional
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
        {/* Recommended Jobs */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Vagas Recomendadas
            </h2>
            <button className="text-sm text-[var(--primary-500)] hover:text-[var(--primary-400)] font-semibold transition-colors">
              Ver todas
            </button>
          </div>
          <div className="space-y-6">
            {recommendedJobs.map((job) => (
              <VagaCard key={job.id} {...job} />
            ))}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Candidaturas Recentes
          </h2>
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="glass rounded-2xl p-4 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all"
              >
                <h3 className="font-semibold text-[var(--text-primary)] mb-1 line-clamp-1">
                  {app.titulo}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  {app.empresa}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-lg"
                    style={{
                      background: `${app.statusColor}20`,
                      color: app.statusColor,
                    }}
                  >
                    {app.status}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {app.appliedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
