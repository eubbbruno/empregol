"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Plus,
  MoreVertical,
  Users,
  Eye,
  Pause,
  Play,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/toast";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function EmpresaVagasPage() {
  const [loading, setLoading] = useState(true);
  const [vagas, setVagas] = useState<any[]>([]);
  const { addToast } = useToast();

  const loadVagas = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("vagas")
          .select("*, candidaturas(count)")
          .eq("empresa_id", user.id)
          .order("created_at", { ascending: false });

        setVagas(data || []);
      }
    } catch (error) {
      console.error("Error loading vagas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVagas();
  }, [loadVagas]);

  const toggleStatus = async (vagaId: string, currentStatus: string) => {
    try {
      const supabase = createClient();
      const newStatus = currentStatus === "ativa" ? "pausada" : "ativa";

      await (supabase.from("vagas") as any)
        .update({ status: newStatus })
        .eq("id", vagaId);

      addToast({
        type: "success",
        title: newStatus === "ativa" ? "Vaga reativada" : "Vaga pausada",
        description:
          newStatus === "ativa"
            ? "A vaga voltou a aparecer nas buscas"
            : "A vaga não aparecerá mais nas buscas",
      });

      loadVagas();
    } catch (error) {
      console.error("Error toggling status:", error);
      addToast({
        type: "error",
        title: "Erro ao atualizar status",
        description: "Tente novamente mais tarde",
      });
    }
  };

  const deleteVaga = async (vagaId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta vaga?")) return;

    try {
      const supabase = createClient();
      await supabase.from("vagas").delete().eq("id", vagaId);

      addToast({
        type: "success",
        title: "Vaga excluída",
        description: "A vaga foi removida permanentemente",
      });

      loadVagas();
    } catch (error) {
      console.error("Error deleting vaga:", error);
      addToast({
        type: "error",
        title: "Erro ao excluir vaga",
        description: "Tente novamente mais tarde",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Minhas Vagas
            </h1>
            <p className="text-gray-600">Gerencie suas vagas publicadas</p>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (vagas.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Minhas Vagas
            </h1>
            <p className="text-gray-600">Gerencie suas vagas publicadas</p>
          </div>
          <Link href="/empresa/publicar-vaga">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-5 h-5" />
              Publicar Vaga
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma vaga publicada ainda
          </h3>
          <p className="text-gray-600 mb-6">
            Comece a atrair os melhores talentos publicando sua primeira vaga
          </p>
          <Link href="/empresa/publicar-vaga">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-5 h-5" />
              Publicar Primeira Vaga
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={fadeInUp}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Minhas Vagas
          </h1>
          <p className="text-gray-600">{vagas.length} vagas publicadas</p>
        </div>
        <Link href="/empresa/publicar-vaga">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            Publicar Vaga
          </Button>
        </Link>
      </motion.div>

      <div className="space-y-4">
        {vagas.map((vaga) => {
          const candidatosCount = Array.isArray(vaga.candidaturas)
            ? vaga.candidaturas.length
            : 0;

          return (
            <motion.div
              key={vaga.id}
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {vaga.titulo}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vaga.status === "ativa"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-gray-50 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {vaga.status === "ativa" ? "Ativa" : "Pausada"}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {candidatosCount}{" "}
                        {candidatosCount === 1 ? "candidato" : "candidatos"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>
                        Publicada{" "}
                        {formatDistanceToNow(new Date(vaga.created_at), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {vaga.tipo_contrato}
                    </span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                      {vaga.modelo_trabalho}
                    </span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">
                      {vaga.nivel}
                    </span>
                  </div>
                </div>

                {/* Actions Dropdown */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[200px] bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50"
                      sideOffset={5}
                    >
                      <Link href={`/vagas/${vaga.id}`}>
                        <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer outline-none">
                          <Eye className="w-4 h-4" />
                          Ver vaga
                        </DropdownMenu.Item>
                      </Link>

                      <Link href={`/empresa/candidatos?vaga=${vaga.id}`}>
                        <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer outline-none">
                          <Users className="w-4 h-4" />
                          Ver candidatos
                        </DropdownMenu.Item>
                      </Link>

                      <DropdownMenu.Separator className="h-px bg-gray-200 my-2" />

                      <DropdownMenu.Item
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer outline-none"
                        onSelect={() => toggleStatus(vaga.id, vaga.status)}
                      >
                        {vaga.status === "ativa" ? (
                          <>
                            <Pause className="w-4 h-4" />
                            Pausar vaga
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Reativar vaga
                          </>
                        )}
                      </DropdownMenu.Item>

                      <DropdownMenu.Separator className="h-px bg-gray-200 my-2" />

                      <DropdownMenu.Item
                        className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer outline-none"
                        onSelect={() => deleteVaga(vaga.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir vaga
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
