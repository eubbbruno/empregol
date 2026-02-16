"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Clock,
  AlertCircle,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CandidaturaTimeline } from "@/components/candidatura/CandidaturaTimeline";
import { fadeInUp } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";

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

  return badges[status as keyof typeof badges] || badges.enviada;
}

export default function CandidaturasPage() {
  const [loading, setLoading] = useState(true);
  const [candidaturas, setCandidaturas] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadCandidaturas = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("candidaturas")
          .select("*, vagas(*, empresas(*))")
          .eq("candidato_id", user.id)
          .order("created_at", { ascending: false });

        setCandidaturas(data || []);
      }
    } catch (error) {
      console.error("Error loading candidaturas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCandidaturas();
  }, [loadCandidaturas]);

  const filteredCandidaturas =
    filter === "all"
      ? candidaturas
      : candidaturas.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Minhas Candidaturas
          </h1>
          <p className="text-gray-600">
            Acompanhe o status de todas as suas candidaturas
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Button
          variant={filter === "all" ? "default" : "secondary"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Todas ({candidaturas.length})
        </Button>
        <Button
          variant={filter === "enviada" ? "default" : "secondary"}
          size="sm"
          onClick={() => setFilter("enviada")}
        >
          Enviadas ({candidaturas.filter((c) => c.status === "enviada").length})
        </Button>
        <Button
          variant={filter === "em_analise" ? "default" : "secondary"}
          size="sm"
          onClick={() => setFilter("em_analise")}
        >
          Em Análise ({candidaturas.filter((c) => c.status === "em_analise").length})
        </Button>
        <Button
          variant={filter === "entrevista" ? "default" : "secondary"}
          size="sm"
          onClick={() => setFilter("entrevista")}
        >
          Entrevistas ({candidaturas.filter((c) => c.status === "entrevista").length})
        </Button>
      </div>

      {/* Candidaturas List */}
      <motion.div
        variants={fadeInUp}
        className="bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-50 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredCandidaturas.length > 0 ? (
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidaturas.map((candidatura: any) => {
                  const badge = getStatusBadge(candidatura.status);
                  const Icon = badge.icon;
                  const isExpanded = expandedId === candidatura.id;
                  return (
                    <>
                      <tr
                        key={candidatura.id}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
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
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(candidatura.created_at).toLocaleDateString(
                            "pt-BR"
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              setExpandedId(isExpanded ? null : candidatura.id)
                            }
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 bg-gray-50/50">
                            <CandidaturaTimeline
                              currentStatus={candidatura.status}
                              createdAt={candidatura.created_at}
                              updatedAt={candidatura.updated_at}
                            />
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 px-6">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma candidatura encontrada
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === "all"
                ? "Você ainda não se candidatou a nenhuma vaga"
                : "Nenhuma candidatura com este status"}
            </p>
            <Link href="/vagas">
              <Button>Explorar Vagas</Button>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
