"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Building2, ArrowRight, Loader2 } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/toast";
import Image from "next/image";

export default function TipoContaPage() {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<"candidato" | "empresa" | null>(null);
  const router = useRouter();
  const { addToast } = useToast();

  const handleSelectType = async (tipo: "candidato" | "empresa") => {
    setSelectedType(tipo);
    setLoading(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      // Create profile with selected type
      const { error: profileError } = await (supabase.from("profiles") as any).insert({
        id: user.id,
        tipo,
        nome_completo: user.user_metadata?.full_name || user.email,
        avatar_url: user.user_metadata?.avatar_url,
      });

      if (profileError) throw profileError;

      // Create candidato or empresa record
      if (tipo === "candidato") {
        await (supabase.from("candidatos") as any).insert({ id: user.id });
      } else {
        await (supabase.from("empresas") as any).insert({
          id: user.id,
          nome_empresa: user.user_metadata?.full_name || user.email,
        });
      }

      addToast({
        type: "success",
        title: "Conta criada!",
        description: "Redirecionando para seu dashboard...",
      });

      // Redirect to appropriate dashboard
      if (tipo === "empresa") {
        router.push("/empresa/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      addToast({
        type: "error",
        title: "Erro ao criar conta",
        description: "Tente novamente",
      });
      setLoading(false);
      setSelectedType(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4 py-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl"
      >
        {/* Logo */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <Image
            src="/logo-empreGol-paths.svg"
            alt="EmpreGol"
            width={200}
            height={60}
            className="h-12 w-auto mx-auto mb-6"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Como você quer usar o EmpreGol?
          </h1>
          <p className="text-lg text-gray-600">
            Selecione o tipo de conta para continuar
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Candidato */}
          <motion.button
            variants={fadeInUp}
            onClick={() => handleSelectType("candidato")}
            disabled={loading}
            className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 text-left group ${
              selectedType === "candidato"
                ? "border-green-500 shadow-xl scale-105"
                : "border-gray-200 hover:border-green-300 hover:shadow-lg"
            } ${loading && selectedType !== "candidato" ? "opacity-50" : ""}`}
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
              <User className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Sou Candidato
            </h2>
            <p className="text-gray-600 mb-6">
              Encontre vagas, candidate-se e acompanhe suas oportunidades
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Busque vagas personalizadas
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Candidate-se com 1 clique
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Acompanhe suas candidaturas
              </li>
            </ul>

            <div className="flex items-center justify-between">
              {loading && selectedType === "candidato" ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-medium">Criando conta...</span>
                </div>
              ) : (
                <>
                  <span className="text-green-600 font-semibold">
                    Continuar como Candidato
                  </span>
                  <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </motion.button>

          {/* Empresa */}
          <motion.button
            variants={fadeInUp}
            onClick={() => handleSelectType("empresa")}
            disabled={loading}
            className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 text-left group ${
              selectedType === "empresa"
                ? "border-blue-500 shadow-xl scale-105"
                : "border-gray-200 hover:border-blue-300 hover:shadow-lg"
            } ${loading && selectedType !== "empresa" ? "opacity-50" : ""}`}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Sou Empresa
            </h2>
            <p className="text-gray-600 mb-6">
              Publique vagas, encontre talentos e gerencie candidatos
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Publique vagas ilimitadas
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Receba candidaturas qualificadas
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Gerencie todo o processo
              </li>
            </ul>

            <div className="flex items-center justify-between">
              {loading && selectedType === "empresa" ? (
                <div className="flex items-center gap-2 text-blue-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-medium">Criando conta...</span>
                </div>
              ) : (
                <>
                  <span className="text-blue-600 font-semibold">
                    Continuar como Empresa
                  </span>
                  <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
