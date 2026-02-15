"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Briefcase, DollarSign, Clock, Building2, Bookmark, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cardHover } from "@/lib/animations";

type WorkModel = "presencial" | "remoto" | "hibrido";

interface VagaCardProps {
  id: string;
  titulo: string;
  empresa: string;
  logoEmpresa?: string;
  cidade: string;
  estado: string;
  tipo: "CLT" | "PJ" | "Estágio" | "Freelancer";
  nivel: "Estágio" | "Júnior" | "Pleno" | "Sênior" | "Liderança";
  salario_min?: number | null;
  salario_max?: number | null;
  modelo: WorkModel;
  publicadoEm?: Date;
  tags?: string[];
  matchScore?: number;
  verificada?: boolean;
}

export function VagaCard({
  id,
  titulo,
  empresa,
  logoEmpresa,
  cidade,
  estado,
  tipo,
  nivel,
  salario_min,
  salario_max,
  modelo,
  publicadoEm,
  tags = [],
  matchScore,
  verificada = false,
}: VagaCardProps) {
  const timeAgo = () => {
    if (!publicadoEm) return "Recente";
    const days = Math.floor(
      (Date.now() - publicadoEm.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days === 0) return "Hoje";
    if (days === 1) return "Ontem";
    return `Há ${days} dias`;
  };

  const formatSalario = () => {
    if (!salario_min && !salario_max) return "A combinar";
    if (salario_min && salario_max) {
      return `R$ ${(salario_min / 1000).toFixed(0)}k - ${(salario_max / 1000).toFixed(0)}k`;
    }
    if (salario_min) return `A partir de R$ ${(salario_min / 1000).toFixed(0)}k`;
    return `Até R$ ${(salario_max! / 1000).toFixed(0)}k`;
  };

  const localizacao = `${cidade}, ${estado}`;
  const remoto = modelo === "remoto";

  return (
    <a href={`/vagas/${id}`}>
      <motion.div
        variants={cardHover}
        whileHover="hover"
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300 cursor-pointer group"
      >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Company Logo */}
        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200 relative overflow-hidden">
          {logoEmpresa ? (
            <Image
              src={logoEmpresa}
              alt={empresa}
              width={40}
              height={40}
              className="object-contain"
            />
          ) : (
            <Building2 className="w-6 h-6 text-gray-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors line-clamp-2">
            {titulo}
          </h3>

          {/* Company */}
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600 font-medium">{empresa}</p>
            {verificada && (
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Bookmark */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bookmark className="w-5 h-5 text-gray-400 hover:text-purple-600" />
        </button>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="truncate">{remoto ? "Remoto" : localizacao}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="truncate">{tipo}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="truncate">{formatSalario()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="truncate">{timeAgo()}</span>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
            {nivel}
          </span>
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
            {modelo.charAt(0).toUpperCase() + modelo.slice(1)}
          </span>
          {tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        {matchScore && (
          <div className="flex items-center gap-2">
            <div className="w-full bg-gray-200 rounded-full h-2 w-20">
              <div
                className="bg-gradient-primary h-2 rounded-full transition-all"
                style={{ width: `${matchScore}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-green-700">
              {matchScore}% match
            </span>
          </div>
        )}

        <Button
          size="sm"
          className="bg-gradient-primary text-white shadow-md ml-auto"
        >
          Ver detalhes
        </Button>
      </div>
      </motion.div>
    </a>
  );
}
