"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VagaCard } from "@/components/cards/VagaCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

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

export default function SalvasPage() {
  const [loading, setLoading] = useState(true);
  const [vagas, setVagas] = useState<VagaWithEmpresa[]>([]);

  const loadSavedVagas = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("vagas_salvas")
          .select("vaga_id, vagas(*, empresas(*))")
          .eq("candidato_id", user.id)
          .order("created_at", { ascending: false });

        if (data) {
          const vagasData = data
            .map((item: any) => item.vagas)
            .filter(Boolean) as VagaWithEmpresa[];
          setVagas(vagasData);
        }
      }
    } catch (error) {
      console.error("Error loading saved vagas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSavedVagas();
  }, [loadSavedVagas]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vagas Salvas</h1>
          <p className="text-gray-600">Suas vagas favoritas para revisitar depois</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse"
            >
              <div className="h-12 bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vagas Salvas</h1>
          <p className="text-gray-600">Suas vagas favoritas para revisitar depois</p>
        </div>

        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma vaga salva ainda
          </h3>
          <p className="text-gray-600 mb-6">
            Salve vagas interessantes para revisitar mais tarde
          </p>
          <Link href="/vagas">
            <Button>Explorar Vagas</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vagas Salvas</h1>
          <p className="text-gray-600">{vagas.length} vagas salvas</p>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {vagas.map((vaga) => (
          <motion.div key={vaga.id} variants={fadeInUp}>
            <VagaCard
              id={vaga.id}
              titulo={vaga.titulo}
              empresa={vaga.empresas?.nome_empresa || "Empresa"}
              cidade={vaga.cidade || ""}
              estado={vaga.estado || ""}
              salario_min={vaga.salario_min}
              salario_max={vaga.salario_max}
              tipo={mapTipoContrato(vaga.tipo_contrato)}
              nivel={mapNivel(vaga.nivel)}
              modelo={vaga.modelo_trabalho}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
