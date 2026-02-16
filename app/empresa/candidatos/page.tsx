"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Eye,
  Calendar,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/toast";

function getStatusBadge(status: string) {
  const badges = {
    enviada: { bg: "bg-yellow-50", text: "text-yellow-700", label: "Enviada" },
    em_analise: { bg: "bg-blue-50", text: "text-blue-700", label: "Em Análise" },
    entrevista: { bg: "bg-green-50", text: "text-green-700", label: "Entrevista" },
    aprovada: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Aprovado" },
    recusada: { bg: "bg-red-50", text: "text-red-700", label: "Recusado" },
  };
  return badges[status as keyof typeof badges] || badges.enviada;
}

export default function CandidatosPage() {
  const [loading, setLoading] = useState(true);
  const [candidaturas, setCandidaturas] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { addToast } = useToast();

  const loadCandidaturas = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Buscar todas as vagas da empresa
        const { data: vagas } = await supabase
          .from("vagas")
          .select("id")
          .eq("empresa_id", user.id);

        if (vagas && vagas.length > 0) {
          const vagaIds = vagas.map((v: any) => v.id);

          // Buscar candidaturas para essas vagas
          const { data } = await supabase
            .from("candidaturas")
            .select(`
              *,
              vagas(titulo),
              candidatos(
                id,
                titulo_profissional,
                profiles(nome_completo, avatar_url)
              )
            `)
            .in("vaga_id", vagaIds)
            .order("created_at", { ascending: false });

          setCandidaturas(data || []);
        }
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

  const handleStatusChange = async (candidaturaId: string, newStatus: string) => {
    try {
      const supabase = createClient();
      const { error } = await (supabase.from("candidaturas") as any)
        .update({ status: newStatus })
        .eq("id", candidaturaId);

      if (error) throw error;

      // Atualizar localmente
      setCandidaturas((prev) =>
        prev.map((c) => (c.id === candidaturaId ? { ...c, status: newStatus } : c))
      );

      addToast({
        type: "success",
        title: "Status atualizado",
        description: "O status da candidatura foi alterado com sucesso",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      addToast({
        type: "error",
        title: "Erro",
        description: "Não foi possível atualizar o status",
      });
    }
  };

  const filteredCandidaturas = candidaturas.filter((c: any) => {
    if (!search) return true;
    const nome = c.candidatos?.profiles?.nome_completo || "";
    const vaga = c.vagas?.titulo || "";
    return (
      nome.toLowerCase().includes(search.toLowerCase()) ||
      vaga.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidatos</h1>
          <p className="text-gray-600">
            Gerencie todas as candidaturas recebidas
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por candidato ou vaga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12"
          />
        </div>
      </div>

      {/* Candidaturas List */}
      <motion.div
        variants={fadeInUp}
        className="bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
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
                    Candidato
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Vaga
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Match
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidaturas.map((candidatura: any) => {
                  const badge = getStatusBadge(candidatura.status);
                  const candidato = candidatura.candidatos;
                  const profile = candidato?.profiles;
                  const matchScore = Math.floor(Math.random() * 30) + 70; // Mock

                  return (
                    <tr
                      key={candidatura.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar.Root className="w-10 h-10">
                            <Avatar.Fallback className="w-full h-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center rounded-full">
                              {profile?.nome_completo?.charAt(0).toUpperCase() || "?"}
                            </Avatar.Fallback>
                          </Avatar.Root>
                          <div>
                            <p className="font-medium text-gray-900">
                              {profile?.nome_completo || "Candidato"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {candidato?.titulo_profissional || "Profissional"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {candidatura.vagas?.titulo || "Vaga"}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                          {matchScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(candidatura.created_at).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={candidatura.status}
                          onChange={(e) => handleStatusChange(candidatura.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="enviada">Enviada</option>
                          <option value="em_analise">Em Análise</option>
                          <option value="entrevista">Entrevista</option>
                          <option value="aprovada">Aprovado</option>
                          <option value="recusada">Recusado</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Ver perfil"
                          >
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Agendar entrevista"
                          >
                            <Calendar className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 px-6">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum candidato encontrado
            </h3>
            <p className="text-gray-500 mb-6">
              {search
                ? "Nenhum candidato corresponde à sua busca"
                : "Você ainda não recebeu candidaturas"}
            </p>
            {!search && (
              <Link href="/empresa/publicar-vaga">
                <Button>Publicar Nova Vaga</Button>
              </Link>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
