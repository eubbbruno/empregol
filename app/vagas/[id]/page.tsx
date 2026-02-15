"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { VagaCard } from "@/components/cards/VagaCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/toast";
import { Database } from "@/types/database.types";

type Vaga = Database["public"]["Tables"]["vagas"]["Row"];
type Empresa = Database["public"]["Tables"]["empresas"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface VagaWithEmpresa extends Vaga {
  empresas: Empresa | null;
}

// Helper functions to map database types to UI types
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

        // Check if already applied
        if (profileData?.tipo === "candidato") {
          const { data: candidatura } = await supabase
            .from("candidaturas")
            .select("*")
            .eq("candidato_id", user.id)
            .eq("vaga_id", params.id as string)
            .single();

          setAlreadyApplied(!!candidatura);
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

      const { data, error } = await supabase
        .from("vagas")
        .select(
          `
          *,
          empresas (
            nome_empresa,
            logo_url,
            verificada,
            descricao,
            website
          )
        `
        )
        .eq("id", params.id as string)
        .single();

      if (error) throw error;

      setVaga(data as VagaWithEmpresa);

      // Load similar jobs
      const vagaData = data as VagaWithEmpresa;
      if (vagaData.area) {
        const { data: similar } = await supabase
          .from("vagas")
          .select(
            `
            *,
            empresas (
              nome_empresa,
              logo_url,
              verificada
            )
          `
          )
          .eq("status", "ativa")
          .eq("area", vagaData.area)
          .neq("id", params.id as string)
          .limit(3);

        setSimilarVagas((similar as VagaWithEmpresa[]) || []);
      }

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error loading job";
      console.error(message);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    loadVaga();
    checkUserStatus();
  }, [loadVaga, checkUserStatus]);

  const handleApply = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    if (userType !== "candidato") {
      addToast({
        type: "error",
        title: "Erro",
        description: "Apenas candidatos podem se candidatar a vagas",
      });
      return;
    }

    setApplying(true);

    try {
      // @ts-expect-error - Supabase type inference issue with insert
      const { error } = await supabase.from("candidaturas").insert([{
        candidato_id: user.id,
        vaga_id: params.id as string,
        status: "enviada" as const,
      }]);

      if (error) throw error;

      addToast({
        type: "success",
        title: "Candidatura enviada!",
        description: "Boa sorte no processo seletivo",
      });

      setAlreadyApplied(true);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erro ao candidatar";
      console.error(message);
      addToast({
        type: "error",
        title: "Erro ao candidatar",
        description: "Tente novamente mais tarde",
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] pt-24">
          <Loader2 className="w-12 h-12 animate-spin text-green-600" />
        </div>
      </div>
    );
  }

  if (!vaga) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] pt-24">
          <p className="text-xl text-gray-600 mb-4">Vaga não encontrada</p>
          <Link href="/vagas">
            <Button>Ver todas as vagas</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Back Button */}
            <motion.div variants={fadeInUp} className="mb-6">
              <Link
                href="/vagas"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar para vagas
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Job Header */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {vaga.empresas?.logo_url ? (
                        <Image
                          src={vaga.empresas.logo_url}
                          alt={vaga.empresas.nome_empresa || "Empresa"}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      ) : (
                        <Building2 className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                          {vaga.titulo}
                        </h1>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Share2 className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <p className="text-xl text-gray-700">
                          {vaga.empresas?.nome_empresa || "Empresa"}
                        </p>
                        {vaga.empresas?.verificada && (
                          <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {vaga.cidade}, {vaga.estado}
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          {vaga.tipo_contrato.toUpperCase()} •{" "}
                          {vaga.modelo_trabalho}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Publicada há{" "}
                          {Math.floor(
                            (Date.now() - new Date(vaga.created_at).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          dias
                        </div>
                      </div>
                    </div>
                  </div>

                  {vaga.mostra_salario && vaga.salario_min && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-green-900 font-semibold">
                        R$ {vaga.salario_min.toLocaleString()} - R${" "}
                        {vaga.salario_max?.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {vaga.skills_requeridas && vaga.skills_requeridas.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {vaga.skills_requeridas.map((skill: string) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Description */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Descrição da Vaga
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {vaga.descricao}
                  </p>
                </motion.div>

                {/* Requirements */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Requisitos
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {vaga.requisitos}
                  </p>
                </motion.div>

                {/* Benefits */}
                {vaga.beneficios && (
                  <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Benefícios
                    </h2>
                    <p className="text-gray-700 whitespace-pre-line">
                      {vaga.beneficios}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Apply Card */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-24"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Candidatar-se
                  </h3>
                  {alreadyApplied ? (
                    <div className="text-center py-4">
                      <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <p className="text-green-700 font-semibold">
                        Você já se candidatou a esta vaga
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={handleApply}
                      size="lg"
                      className="w-full bg-gradient-primary text-white shadow-md"
                      disabled={applying}
                    >
                      {applying ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Candidatar-se agora"
                      )}
                    </Button>
                  )}

                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>Nível: {vaga.nivel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span>Área: {vaga.area}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Company Info */}
                {vaga.empresas && (
                  <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Sobre a Empresa
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      {vaga.empresas.descricao || "Sem descrição disponível"}
                    </p>
                    {vaga.empresas.website && (
                      <a
                        href={vaga.empresas.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 font-semibold text-sm"
                      >
                        Visitar site →
                      </a>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Similar Jobs */}
            {similarVagas.length > 0 && (
              <motion.div variants={fadeInUp} className="mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Vagas Similares
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {similarVagas.map((similarVaga) => (
                    <VagaCard
                      key={similarVaga.id}
                      id={similarVaga.id}
                      titulo={similarVaga.titulo}
                      empresa={similarVaga.empresas?.nome_empresa || "Empresa"}
                      logoEmpresa={similarVaga.empresas?.logo_url || undefined}
                      cidade={similarVaga.cidade || ""}
                      estado={similarVaga.estado || ""}
                      tipo={mapTipoContrato(similarVaga.tipo_contrato)}
                      nivel={mapNivel(similarVaga.nivel)}
                      salario_min={similarVaga.salario_min}
                      salario_max={similarVaga.salario_max}
                      modelo={similarVaga.modelo_trabalho}
                      publicadoEm={new Date(similarVaga.created_at)}
                      tags={similarVaga.skills_requeridas || []}
                      verificada={similarVaga.empresas?.verificada || false}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
