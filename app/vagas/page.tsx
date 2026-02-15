"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, Grid3x3, List, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VagaCard } from "@/components/cards/VagaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";

export default function VagasPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vagas, setVagas] = useState<any[]>([]);
  
  const [filters, setFilters] = useState({
    search: "",
    tipo_contrato: "",
    modelo_trabalho: "",
    nivel: "",
    cidade: "",
  });

  useEffect(() => {
    loadVagas();
  }, [filters]);

  const loadVagas = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      let query = supabase
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
        .order("created_at", { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.or(
          `titulo.ilike.%${filters.search}%,descricao.ilike.%${filters.search}%`
        );
      }
      if (filters.tipo_contrato) {
        query = query.eq("tipo_contrato", filters.tipo_contrato);
      }
      if (filters.modelo_trabalho) {
        query = query.eq("modelo_trabalho", filters.modelo_trabalho);
      }
      if (filters.nivel) {
        query = query.eq("nivel", filters.nivel);
      }
      if (filters.cidade) {
        query = query.ilike("cidade", `%${filters.cidade}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setVagas(data || []);
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Encontre sua próxima{" "}
                <span className="gradient-text-primary">oportunidade</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {vagas.length} vagas disponíveis
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-4 shadow-md border border-gray-200"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar por cargo, empresa ou palavra-chave..."
                    className="pl-12 h-12 border-0 bg-gray-50"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                  />
                </div>
                <div className="relative md:w-64">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Cidade"
                    className="pl-12 h-12 border-0 bg-gray-50"
                    value={filters.cidade}
                    onChange={(e) =>
                      setFilters({ ...filters, cidade: e.target.value })
                    }
                  />
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  size="lg"
                  className="md:w-auto"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Filtros
                </Button>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Contrato
                    </label>
                    <select
                      className="w-full h-10 rounded-xl bg-gray-50 border border-gray-200 px-3 text-sm"
                      value={filters.tipo_contrato}
                      onChange={(e) =>
                        setFilters({ ...filters, tipo_contrato: e.target.value })
                      }
                    >
                      <option value="">Todos</option>
                      <option value="clt">CLT</option>
                      <option value="pj">PJ</option>
                      <option value="estagio">Estágio</option>
                      <option value="temporario">Temporário</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modelo de Trabalho
                    </label>
                    <select
                      className="w-full h-10 rounded-xl bg-gray-50 border border-gray-200 px-3 text-sm"
                      value={filters.modelo_trabalho}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          modelo_trabalho: e.target.value,
                        })
                      }
                    >
                      <option value="">Todos</option>
                      <option value="remoto">Remoto</option>
                      <option value="presencial">Presencial</option>
                      <option value="hibrido">Híbrido</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nível
                    </label>
                    <select
                      className="w-full h-10 rounded-xl bg-gray-50 border border-gray-200 px-3 text-sm"
                      value={filters.nivel}
                      onChange={(e) =>
                        setFilters({ ...filters, nivel: e.target.value })
                      }
                    >
                      <option value="">Todos</option>
                      <option value="estagio">Estágio</option>
                      <option value="junior">Júnior</option>
                      <option value="pleno">Pleno</option>
                      <option value="senior">Sênior</option>
                      <option value="especialista">Especialista</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      onClick={() =>
                        setFilters({
                          search: "",
                          tipo_contrato: "",
                          modelo_trabalho: "",
                          nivel: "",
                          cidade: "",
                        })
                      }
                      variant="outline"
                      className="w-full"
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* View Toggle */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between"
            >
              <p className="text-gray-600">
                {loading ? "Carregando..." : `${vagas.length} vagas encontradas`}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Jobs Grid/List */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
              </div>
            ) : vagas.length === 0 ? (
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-200 text-center"
              >
                <p className="text-xl text-gray-600">
                  Nenhuma vaga encontrada com os filtros selecionados
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
                    : "space-y-4"
                }
              >
                {vagas.map((vaga) => (
                  <motion.div key={vaga.id} variants={fadeInUp}>
                    <VagaCard
                      titulo={vaga.titulo}
                      empresa={vaga.empresas?.nome_empresa || "Empresa"}
                      logoEmpresa={vaga.empresas?.logo_url}
                      localizacao={`${vaga.cidade || ""}, ${vaga.estado || ""}`.trim()}
                      tipo={vaga.tipo_contrato.toUpperCase() as any}
                      salario={
                        vaga.mostra_salario && vaga.salario_min
                          ? `R$ ${vaga.salario_min.toLocaleString()} - R$ ${vaga.salario_max.toLocaleString()}`
                          : "A combinar"
                      }
                      remoto={vaga.modelo_trabalho === "remoto"}
                      publicadoEm={new Date(vaga.created_at)}
                      tags={vaga.skills_requeridas || []}
                      verificada={vaga.empresas?.verificada || false}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
