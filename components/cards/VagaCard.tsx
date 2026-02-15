"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, DollarSign, Clock, Building2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cardHover } from "@/lib/animations";

interface VagaCardProps {
  id: string;
  titulo: string;
  empresa: string;
  logoEmpresa?: string;
  localizacao: string;
  tipo: "CLT" | "PJ" | "Estágio" | "Freelance";
  nivel: "Júnior" | "Pleno" | "Sênior" | "Especialista";
  salario?: {
    min: number;
    max: number;
  };
  remoto: boolean;
  publicadoEm: string;
  tags: string[];
  matchScore?: number;
  verificada?: boolean;
}

export function VagaCard({
  id,
  titulo,
  empresa,
  logoEmpresa,
  localizacao,
  tipo,
  nivel,
  salario,
  remoto,
  publicadoEm,
  tags,
  matchScore,
  verificada = false,
}: VagaCardProps) {
  const formatSalario = (min: number, max: number) => {
    const formatNumber = (num: number) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
    };
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Agora mesmo";
    if (diffInHours < 24) return `Há ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Há ${diffInDays}d`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `Há ${diffInWeeks}sem`;
  };

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="glass rounded-2xl p-6 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all cursor-pointer relative overflow-hidden group"
    >
      {/* Match Score Badge */}
      {matchScore && matchScore >= 70 && (
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              matchScore >= 90
                ? "bg-gradient-to-r from-[var(--success-500)] to-[var(--success-400)] text-white shadow-[0_0_20px_var(--success-glow)]"
                : matchScore >= 80
                ? "bg-gradient-primary text-white shadow-[0_0_20px_var(--primary-glow)]"
                : "glass border border-[var(--success-500)] text-[var(--success-500)]"
            }`}
          >
            {matchScore}% Match
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Company Logo */}
        <div className="w-14 h-14 rounded-xl glass flex items-center justify-center flex-shrink-0 border border-[var(--glass-border)]">
          {logoEmpresa ? (
            <img
              src={logoEmpresa}
              alt={empresa}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <Building2 className="w-6 h-6 text-[var(--text-muted)]" />
          )}
        </div>

        {/* Title & Company */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 line-clamp-1 group-hover:text-[var(--primary-500)] transition-colors">
            {titulo}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-secondary)] font-medium">
              {empresa}
            </span>
            {verificada && (
              <div className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
        </div>

        {/* Bookmark Button */}
        <motion.button
          className="w-10 h-10 rounded-xl glass hover:bg-[var(--glass-bg-hover)] flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bookmark className="w-5 h-5 text-[var(--text-secondary)]" />
        </motion.button>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <MapPin className="w-4 h-4 text-[var(--primary-500)]" />
          <span className="line-clamp-1">{remoto ? "Remoto" : localizacao}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Briefcase className="w-4 h-4 text-[var(--secondary-500)]" />
          <span>{tipo}</span>
        </div>
        {salario && (
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] col-span-2">
            <DollarSign className="w-4 h-4 text-[var(--success-500)]" />
            <span>{formatSalario(salario.min, salario.max)}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)]">
          {nivel}
        </span>
        {remoto && (
          <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-600)] text-white">
            Remoto
          </span>
        )}
        {tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-[var(--glass-bg)] text-[var(--text-secondary)]"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="px-3 py-1 rounded-lg text-xs font-medium text-[var(--text-muted)]">
            +{tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--glass-border)]">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Clock className="w-4 h-4" />
          <span>{getTimeAgo(publicadoEm)}</span>
        </div>
        <Button variant="primary" size="sm">
          Ver Detalhes
        </Button>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          boxShadow: matchScore && matchScore >= 80
            ? "0 0 40px var(--primary-glow)"
            : "0 0 30px var(--glass-border-hover)",
        }}
      />
    </motion.div>
  );
}
