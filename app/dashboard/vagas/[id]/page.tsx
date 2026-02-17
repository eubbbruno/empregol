"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building2,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  Share2,
  Users,
  Globe,
  Check,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VagaCard } from "@/components/cards/VagaCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/toast";
import { Database } from "@/types/database.types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type Vaga = Database["public"]["Tables"]["vagas"]["Row"];
type Empresa = Database["public"]["Tables"]["empresas"]["Row"];

interface VagaWithEmpresa extends Vaga {
  empresas: Empresa | null;
}

function mapTipoContrato(tipo: string): "CLT" | "PJ" | "Estágio" | "Freelancer" {
  const tipoUpper = tipo.toUpperCase();
  if (tipoUpper === "ESTAGIO") return "Estágio";
  if (tipoUpper === "TEMPORARIO") return "Freelancer";
  return tipoUpper as "CLT" | "PJ";
}

function mapNivel(nivel: string): "Estágio" | "Júnior" | "Pleno" | "Sênior" | "Liderança" {
  if (nivel === "estagio") return "Estágio";
  if (nivel === "junior") return "Júnior";
  if (nivel === "pleno") return "Pleno";
  if (nivel === "senior") return "Sênior";
  if (nivel === "especialista") return "Liderança";
  return "Júnior";
}

function formatSalario(min?: number | null, max?: number | null): string {
  if (!min && !max) return "A combinar";
  if (min && max) return `R$ ${(min / 1000).toFixed(0)}k - ${(max / 1000).toFixed(0)}k`;
  if (min) return `A partir de R$ ${(min / 1000).toFixed(0)}k`;
  return `Até R$ ${(max! / 1000).toFixed(0)}k`;
}

export default function DashboardVagaDetailPage() {
  const params = useParams();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [vaga, setVaga] = useState<VagaWithEmpresa | null>(null);
  const [similarVagas, setSimilarVagas] = useState<VagaWithEmpresa[]>([]);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const checkUserStatus = useCallback(async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Check if already applied
        const { data: candidatura } = await supabase
          .from("candidaturas")
          .select("status")
          .eq("candidato_id", user.id)
          .eq("vaga_id", params.id as string)
          .single();

        if (candidatura) {
          setAlreadyApplied(true);
          setApplicationStatus((candidatura as any).status);
        }

        // Check if saved
        const { data: saved } = await supabase
          .from("vagas_salvas")
          .select("id")
          .eq("candidato_id", user.id)
          .eq("vaga_id", params.id as string)
          .single();

        setIsSaved(!!saved);
      }
    } catch (error) {
      console.error("Error checking user status:", error);
    }
  }, [params.id]);

  const loadVaga = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: vagaData } = await supabase
        .from("vagas")
        .select("*, empresas(*)")
        .eq("id", params.id as string)
        .single();

      if (vagaData) {
        setVaga(vagaData as VagaWithEmpresa);

        // Load similar vagas
        const { data: similarData } = await supabase
          .from("vagas")
          .select("*, empresas(*)")
          .eq("area", (vagaData as any).area)
          .neq("id", params.id as string)
          .eq("status", "ativa")
          .limit(3);

        setSimilarVagas((similarData as VagaWithEmpresa[]) || []);
      }

      await checkUserStatus();
    } catch (error) {
      console.error("Error loading vaga:", error);
    } finally {
      setLoading(false);
    }
  }, [params.id, checkUserStatus]);

  useEffect(() => {
    loadVaga();
  }, [loadVaga]);

  const handleApply = async () => {
    setApplying(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await (supabase.from("candidaturas") as any).insert({
          candidato_id: user.id,
          vaga_id: params.id,
          status: "enviada",
        });

        addToast({
          type: "success",
          title: "Candidatura enviada!",
          description: "Você se candidatou com sucesso a esta vaga",
        });

        setAlreadyApplied(true);
        setApplicationStatus("enviada");
      }
    } catch (error) {
      console.error("Error applying:", error);
      addToast({
        type: "error",
        title: "Erro ao candidatar",
        description: "Tente novamente mais tarde",
      });
    } finally {
      setApplying(false);
    }
  };

  const handleToggleSave = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        if (isSaved) {
          await supabase
            .from("vagas_salvas")
            .delete()
            .eq("candidato_id", user.id)
            .eq("vaga_id", params.id as string);

          addToast({
            type: "success",
            title: "Vaga removida",
            description: "Vaga removida dos favoritos",
          });
        } else {
          await (supabase.from("vagas_salvas") as any).insert({
            candidato_id: user.id,
            vaga_id: params.id,
          });

          addToast({
            type: "success",
            title: "Vaga salva!",
            description: "Vaga adicionada aos favoritos",
          });
        }

        setIsSaved(!isSaved);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast({
      type: "success",
      title: "Link copiado!",
      description: "O link da vaga foi copiado para a área de transferência",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent" />
      </div>
    );
  }

  if (!vaga) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vaga não encontrada</h2>
        <Link href="/dashboard/vagas">
          <Button>Voltar para Vagas</Button>
        </Link>
      </div>
    );
  }

  const requisitos = Array.isArray(vaga.requisitos)
    ? vaga.requisitos
    : typeof vaga.requisitos === "string"
    ? (vaga.requisitos as string).split("\n").filter(Boolean)
    : [];

  const beneficios = Array.isArray(vaga.beneficios)
    ? vaga.beneficios
    : typeof vaga.beneficios === "string"
    ? (vaga.beneficios as string).split("\n").filter(Boolean)
    : [];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto"
    >
      {/* Back Button */}
      <motion.div variants={fadeInUp} className="mb-6">
        <Link href="/dashboard/vagas">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Vagas
          </Button>
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h1 className="text-3xl font-bold font-heading text-gray-900 mb-4">
              {vaga.titulo}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span className="font-medium">{vaga.empresas?.nome_empresa}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>
                  {vaga.cidade}, {vaga.estado}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>
                  Publicada{" "}
                  {formatDistanceToNow(new Date(vaga.created_at), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {vaga.tipo_contrato}
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                {vaga.modelo_trabalho}
              </span>
              <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
                {vaga.nivel}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre a Vaga</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {vaga.descricao}
            </p>
          </div>

          {/* Requirements */}
          {requisitos.length > 0 && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Requisitos</h2>
              <ul className="space-y-3">
                {requisitos.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {beneficios.length > 0 && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Benefícios</h2>
              <ul className="space-y-3">
                {beneficios.map((ben, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{ben}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* About Company */}
          {vaga.empresas && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre a Empresa</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {vaga.empresas.nome_empresa}
                  </h3>
                  {vaga.empresas.descricao && (
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {vaga.empresas.descricao}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {vaga.empresas.setor && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{vaga.empresas.setor}</span>
                      </div>
                    )}
                    {vaga.empresas.tamanho && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{vaga.empresas.tamanho}</span>
                      </div>
                    )}
                    {vaga.empresas.website && (
                      <a
                        href={vaga.empresas.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-600 hover:text-green-700"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.aside variants={fadeInUp} className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            {/* Apply Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatSalario(vaga.salario_min, vaga.salario_max)}
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{vaga.tipo_contrato}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{vaga.modelo_trabalho}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{vaga.nivel}</span>
                  </div>
                </div>
              </div>

              {alreadyApplied ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-green-900 mb-1">
                    Você já se candidatou
                  </p>
                  <p className="text-sm text-green-700">
                    Status: {applicationStatus === "enviada" && "Enviada"}
                    {applicationStatus === "em_analise" && "Em Análise"}
                    {applicationStatus === "entrevista" && "Entrevista"}
                    {applicationStatus === "aprovada" && "Aprovado"}
                  </p>
                </div>
              ) : (
                <Button
                  onClick={handleApply}
                  disabled={applying}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  {applying ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Candidatar-se
                    </>
                  )}
                </Button>
              )}

              <div className="mt-4 flex gap-2">
                <Button
                  onClick={handleToggleSave}
                  variant="outline"
                  className="flex-1"
                >
                  <Heart className={`w-5 h-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                  {isSaved ? "Salva" : "Salvar"}
                </Button>
                <Button onClick={handleShare} variant="outline" className="flex-1">
                  <Share2 className="w-5 h-5" />
                  {copied ? "Copiado!" : "Compartilhar"}
                </Button>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Similar Jobs */}
      {similarVagas.length > 0 && (
        <motion.div variants={fadeInUp} className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vagas Similares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarVagas.map((similarVaga) => (
              <VagaCard
                key={similarVaga.id}
                id={similarVaga.id}
                titulo={similarVaga.titulo}
                empresa={similarVaga.empresas?.nome_empresa || "Empresa"}
                cidade={similarVaga.cidade || ""}
                estado={similarVaga.estado || ""}
                salario_min={similarVaga.salario_min}
                salario_max={similarVaga.salario_max}
                tipo={mapTipoContrato(similarVaga.tipo_contrato)}
                nivel={mapNivel(similarVaga.nivel)}
                modelo={similarVaga.modelo_trabalho}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
