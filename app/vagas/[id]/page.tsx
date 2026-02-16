"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Calendar,
  Globe,
  Copy,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

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

export default function VagaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [vaga, setVaga] = useState<VagaWithEmpresa | null>(null);
  const [similarVagas, setSimilarVagas] = useState<VagaWithEmpresa[]>([]);
  const [userType, setUserType] = useState<string | null>(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const checkUserStatus = useCallback(async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("tipo")
          .eq("id", user.id)
          .single();

        const profileData = profile as Profile | null;
        setUserType(profileData?.tipo || null);

        if (profileData?.tipo === "candidato") {
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
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error checking user status";
      console.error(message);
    }
  }, [params.id]);

  const loadVaga = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data: vagaData, error } = await supabase
        .from("vagas")
        .select("*, empresas(*)")
        .eq("id", params.id as string)
        .single();

      if (error) throw error;

      setVaga(vagaData as VagaWithEmpresa);

      // Load similar vagas
      if (vagaData) {
        const { data: similarData } = await supabase
          .from("vagas")
          .select("*, empresas(*)")
          .eq("area", (vagaData as any).area)
          .eq("status", "ativa")
          .neq("id", (vagaData as any).id)
          .limit(3);

        setSimilarVagas((similarData as VagaWithEmpresa[]) || []);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error loading vaga";
      console.error(message);
      addToast({
        type: "error",
        title: "Erro",
        description: "Não foi possível carregar a vaga",
      });
    } finally {
      setLoading(false);
    }
  }, [params.id, addToast]);

  useEffect(() => {
    loadVaga();
    checkUserStatus();
  }, [loadVaga, checkUserStatus]);

  const handleApply = async () => {
    if (!userType) {
      router.push("/login");
      return;
    }

    if (userType === "empresa") {
      addToast({
        type: "error",
        title: "Ação não permitida",
        description: "Empresas não podem se candidatar a vagas",
      });
      return;
    }

    setApplying(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { error } = await supabase.from("candidaturas").insert(
        {
          candidato_id: user.id,
          vaga_id: params.id as string,
          status: "enviada",
        } as any
      );

      if (error) throw error;

      setAlreadyApplied(true);
      setApplicationStatus("enviada");
      addToast({
        type: "success",
        title: "Candidatura enviada!",
        description: "Boa sorte no processo seletivo",
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error applying";
      console.error(message);
      addToast({
        type: "error",
        title: "Erro",
        description: "Não foi possível enviar sua candidatura",
      });
    } finally {
      setApplying(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    addToast({
      type: "success",
      title: "Link copiado!",
      description: "O link da vaga foi copiado para a área de transferência",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      enviada: { bg: "bg-yellow-50", text: "text-yellow-700", label: "Enviada" },
      em_analise: { bg: "bg-blue-50", text: "text-blue-700", label: "Em Análise" },
      entrevista: { bg: "bg-green-50", text: "text-green-700", label: "Entrevista" },
      aprovado: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Aprovado" },
      recusado: { bg: "bg-red-50", text: "text-red-700", label: "Recusado" },
    };
    const badge = badges[status as keyof typeof badges] || badges.enviada;
    return (
      <span className={`px-4 py-2 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  if (!vaga) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Vaga não encontrada</h1>
            <p className="text-gray-600 mb-6">A vaga que você procura não existe ou foi removida</p>
            <Link href="/vagas">
              <Button>Ver todas as vagas</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const requisitos = Array.isArray(vaga.requisitos) 
    ? vaga.requisitos.join("\n") 
    : vaga.requisitos || "Não especificado";
  const beneficios = Array.isArray(vaga.beneficios) 
    ? vaga.beneficios.join("\n") 
    : vaga.beneficios || "Não especificado";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-6">
            <Link
              href="/vagas"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para vagas
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl border border-gray-200 p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{vaga.titulo}</h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                      <span className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        {vaga.empresas?.nome_empresa || "Empresa"}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {vaga.cidade}, {vaga.estado}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        {formatDistanceToNow(new Date(vaga.created_at), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                        {mapTipoContrato(vaga.tipo_contrato)}
                      </span>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {vaga.modelo_trabalho}
                      </span>
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                        {mapNivel(vaga.nivel)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleShare}
                    className="p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    title="Compartilhar vaga"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Share2 className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Descrição */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl border border-gray-200 p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre a Vaga</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{vaga.descricao}</p>
              </motion.div>

              {/* Requisitos */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl border border-gray-200 p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  Requisitos
                </h2>
                <div className="space-y-2">
                  {requisitos.split("\n").map((req: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700">{req}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Benefícios */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl border border-gray-200 p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Benefícios</h2>
                <div className="space-y-2">
                  {beneficios.split("\n").map((ben: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700">{ben}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Sobre a Empresa */}
              {vaga.empresas && (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl border border-gray-200 p-8"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre a Empresa</h2>
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-gray-900">{vaga.empresas.nome_empresa}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {vaga.empresas.setor && (
                        <span className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          {vaga.empresas.setor}
                        </span>
                      )}
                      {vaga.empresas.tamanho && (
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {vaga.empresas.tamanho === "pequena"
                            ? "1-50 funcionários"
                            : vaga.empresas.tamanho === "media"
                            ? "51-200 funcionários"
                            : "200+ funcionários"}
                        </span>
                      )}
                      {vaga.empresas.website && (
                        <a
                          href={vaga.empresas.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-green-600 hover:text-green-700"
                        >
                          <Globe className="w-4 h-4" />
                          Visitar site
                        </a>
                      )}
                    </div>
                    {vaga.empresas.descricao && (
                      <p className="text-gray-700 mt-4">{vaga.empresas.descricao}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Apply Card - Sticky */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24"
              >
                <div className="space-y-4">
                  {/* Salário */}
                  <div className="text-center py-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-sm font-medium">Salário</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatSalario(vaga.salario_min, vaga.salario_max)}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Tipo de contrato</span>
                      <span className="font-medium text-gray-900">
                        {mapTipoContrato(vaga.tipo_contrato)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Modelo</span>
                      <span className="font-medium text-gray-900">{vaga.modelo_trabalho}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Nível</span>
                      <span className="font-medium text-gray-900">{mapNivel(vaga.nivel)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    {alreadyApplied ? (
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-3">Status da candidatura:</p>
                        {getStatusBadge(applicationStatus || "enviada")}
                      </div>
                    ) : (
                      <Button
                        onClick={handleApply}
                        disabled={applying}
                        className="w-full"
                        size="lg"
                      >
                        {applying ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Enviando...
                          </>
                        ) : (
                          "Candidatar-se"
                        )}
                      </Button>
                    )}
                  </div>

                  {!userType && (
                    <p className="text-xs text-center text-gray-500">
                      Faça login para se candidatar
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Similar Vagas */}
          {similarVagas.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-16"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vagas Similares</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarVagas.map((similarVaga) => (
                  <motion.div key={similarVaga.id} variants={fadeInUp}>
                    <VagaCard
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
