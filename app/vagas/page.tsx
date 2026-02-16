"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Grid3x3,
  List,
  X,
  DollarSign,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VagaCard } from "@/components/cards/VagaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Autocomplete } from "@/components/ui/Autocomplete";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { getVagasWithFilters } from "@/lib/supabase/queries";
import { Database } from "@/types/database.types";

type Vaga = Database["public"]["Tables"]["vagas"]["Row"];
type Empresa = Database["public"]["Tables"]["empresas"]["Row"];

interface VagaWithEmpresa extends Vaga {
  empresas: Empresa | null;
}

const CIDADE_SUGGESTIONS = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Curitiba, PR",
  "Porto Alegre, RS",
  "Brasília, DF",
  "Salvador, BA",
  "Fortaleza, CE",
  "Recife, PE",
  "Goiânia, GO",
  "Remoto",
];

// Helper functions
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

const ITEMS_PER_PAGE = 12;

type SortOption = "recentes" | "salario" | "relevancia";

export default function VagasPage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vagas, setVagas] = useState<VagaWithEmpresa[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("recentes");

  const [filters, setFilters] = useState({
    search: searchParams.get("q") || "",
    tipo_contrato: [] as string[],
    modelo_trabalho: [] as string[],
    nivel: [] as string[],
    cidade: searchParams.get("cidade") || "",
    salario_min: "",
    salario_max: "",
  });

  const loadVagas = useCallback(async () => {
    setLoading(true);
    try {
      const { vagas: vagasData } = await getVagasWithFilters({
        search: filters.search,
        tipo_contrato: filters.tipo_contrato[0],
        modelo_trabalho: filters.modelo_trabalho[0],
        nivel: filters.nivel[0],
        cidade: filters.cidade,
        salario_min: filters.salario_min ? parseInt(filters.salario_min) : undefined,
        salario_max: filters.salario_max ? parseInt(filters.salario_max) : undefined,
      });

      const sortedVagas = [...(vagasData as VagaWithEmpresa[])];
      
      // Aplicar ordenação
      if (sortBy === "recentes") {
        sortedVagas.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else if (sortBy === "salario") {
        sortedVagas.sort((a, b) => {
          const salarioA = a.salario_max || a.salario_min || 0;
          const salarioB = b.salario_max || b.salario_min || 0;
          return salarioB - salarioA;
        });
      }

      setVagas(sortedVagas);
      setCurrentPage(1); // Reset para primeira página ao filtrar
    } catch (error) {
      console.error("Error loading vagas:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy]);

  useEffect(() => {
    loadVagas();
  }, [loadVagas]);

  const handleCheckboxChange = (
    category: "tipo_contrato" | "modelo_trabalho" | "nivel",
    value: string
  ) => {
    setFilters((prev) => {
      const current = prev[category];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      tipo_contrato: [],
      modelo_trabalho: [],
      nivel: [],
      cidade: "",
      salario_min: "",
      salario_max: "",
    });
  };

  const hasActiveFilters =
    filters.tipo_contrato.length > 0 ||
    filters.modelo_trabalho.length > 0 ||
    filters.nivel.length > 0 ||
    filters.cidade ||
    filters.salario_min ||
    filters.salario_max;

  // Paginação
  const totalPages = Math.ceil(vagas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentVagas = vagas.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              variant="secondary"
              className="w-full gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {hasActiveFilters && (
                <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                  Ativos
                </span>
              )}
            </Button>
          </div>

          <div className="flex gap-8">
            {/* Sidebar de Filtros */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${
                showMobileFilters ? "block" : "hidden"
              } lg:block w-full lg:w-80 flex-shrink-0 ${
                showMobileFilters ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : ""
              }`}
            >
              {showMobileFilters && (
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h2 className="text-lg font-bold text-gray-900">Filtros</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filtros
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Busca por Texto */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Buscar
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Cargo, palavra-chave..."
                        value={filters.search}
                        onChange={(e) =>
                          setFilters({ ...filters, search: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Cidade */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Localização
                    </label>
                    <Autocomplete
                      placeholder="Cidade..."
                      suggestions={CIDADE_SUGGESTIONS}
                      value={filters.cidade}
                      onChange={(value) => setFilters({ ...filters, cidade: value })}
                      icon={<MapPin className="w-4 h-4" />}
                    />
                  </div>

                  {/* Tipo de Contrato */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tipo de Contrato
                    </label>
                    <div className="space-y-2">
                      {["CLT", "PJ", "Estágio", "Freelancer"].map((tipo) => (
                        <label
                          key={tipo}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.tipo_contrato.includes(
                              tipo.toLowerCase()
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                "tipo_contrato",
                                tipo.toLowerCase()
                              )
                            }
                            className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{tipo}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Modelo de Trabalho */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Modelo de Trabalho
                    </label>
                    <div className="space-y-2">
                      {["Presencial", "Remoto", "Híbrido"].map((modelo) => (
                        <label
                          key={modelo}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.modelo_trabalho.includes(
                              modelo.toLowerCase()
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                "modelo_trabalho",
                                modelo.toLowerCase()
                              )
                            }
                            className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{modelo}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Nível */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Nível
                    </label>
                    <div className="space-y-2">
                      {["Estágio", "Júnior", "Pleno", "Sênior", "Liderança"].map(
                        (nivel) => (
                          <label
                            key={nivel}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={filters.nivel.includes(nivel.toLowerCase())}
                              onChange={() =>
                                handleCheckboxChange("nivel", nivel.toLowerCase())
                              }
                              className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">{nivel}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* Faixa Salarial */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Faixa Salarial
                    </label>
                    <div className="space-y-3">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="Mínimo"
                          value={filters.salario_min}
                          onChange={(e) =>
                            setFilters({ ...filters, salario_min: e.target.value })
                          }
                          className="pl-10"
                        />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="Máximo"
                          value={filters.salario_max}
                          onChange={(e) =>
                            setFilters({ ...filters, salario_max: e.target.value })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Apply Button */}
                {showMobileFilters && (
                  <div className="lg:hidden mt-6">
                    <Button
                      onClick={() => setShowMobileFilters(false)}
                      className="w-full"
                    >
                      Aplicar Filtros
                    </Button>
                  </div>
                )}
              </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
              >
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Vagas Disponíveis
                  </h1>
                  <p className="text-gray-600">
                    {loading ? "Carregando..." : `${vagas.length} vagas encontradas`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Ordenação */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="recentes">Mais Recentes</option>
                    <option value="salario">Maior Salário</option>
                    <option value="relevancia">Relevância</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Vagas Grid/List */}
              {loading ? (
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
              ) : vagas.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {currentVagas.map((vaga) => (
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
              ) : (
                <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhuma vaga encontrada
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Tente ajustar os filtros ou limpar a busca
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={clearFilters}>Limpar Filtros</Button>
                  )}
                </div>
              )}

              {/* Paginação */}
              {!loading && vagas.length > ITEMS_PER_PAGE && (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="mt-8 flex items-center justify-center gap-2"
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Mostrar apenas algumas páginas
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-all ${
                              page === currentPage
                                ? "bg-green-500 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="px-2 text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="gap-2"
                  >
                    Próxima
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
