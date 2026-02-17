"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  DollarSign,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

export default function DashboardVagasPage() {
  const searchParams = useSearchParams();
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
      setCurrentPage(1);
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

  const totalPages = Math.ceil(vagas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentVagas = vagas.slice(startIndex, endIndex);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex gap-6 h-full"
    >
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="rounded-full shadow-lg bg-green-600 hover:bg-green-700"
          size="lg"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filtros
        </Button>
      </div>

      {/* Filters Sidebar */}
      <motion.aside
        variants={fadeInUp}
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto
          transition-transform duration-300 lg:translate-x-0
          ${showMobileFilters ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Filtros</h2>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cargo ou palavra-chave"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Cidade */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Localização
          </label>
          <Autocomplete
            placeholder="Cidade"
            suggestions={CIDADE_SUGGESTIONS}
            value={filters.cidade}
            onChange={(value) => setFilters({ ...filters, cidade: value })}
            icon={<MapPin className="w-5 h-5" />}
          />
        </div>

        {/* Tipo de Contrato */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipo de Contrato
          </label>
          <div className="space-y-2">
            {["CLT", "PJ", "Estágio", "Freelancer"].map((tipo) => (
              <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.tipo_contrato.includes(tipo.toLowerCase())}
                  onChange={() => handleCheckboxChange("tipo_contrato", tipo.toLowerCase())}
                  className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{tipo}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Modelo de Trabalho */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Modelo de Trabalho
          </label>
          <div className="space-y-2">
            {["Remoto", "Híbrido", "Presencial"].map((modelo) => (
              <label key={modelo} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.modelo_trabalho.includes(modelo.toLowerCase())}
                  onChange={() => handleCheckboxChange("modelo_trabalho", modelo.toLowerCase())}
                  className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{modelo}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Nível */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Nível
          </label>
          <div className="space-y-2">
            {["Estágio", "Júnior", "Pleno", "Sênior", "Liderança"].map((nivel) => (
              <label key={nivel} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.nivel.includes(nivel.toLowerCase())}
                  onChange={() => handleCheckboxChange("nivel", nivel.toLowerCase())}
                  className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{nivel}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salário */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Faixa Salarial (R$)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Mín"
              value={filters.salario_min}
              onChange={(e) => setFilters({ ...filters, salario_min: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Máx"
              value={filters.salario_max}
              onChange={(e) => setFilters({ ...filters, salario_max: e.target.value })}
            />
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full"
        >
          Limpar Filtros
        </Button>
      </motion.aside>

      {/* Main Content */}
      <motion.main variants={fadeInUp} className="flex-1 min-w-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explorar Vagas
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {vagas.length} {vagas.length === 1 ? "vaga encontrada" : "vagas encontradas"}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-green-500"
            >
              <option value="recentes">Mais recentes</option>
              <option value="salario">Maior salário</option>
              <option value="relevancia">Mais relevantes</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Vagas Grid */}
        {!loading && currentVagas.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentVagas.map((vaga) => (
                <VagaCard
                  key={vaga.id}
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
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-green-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <Button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Próxima
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && vagas.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma vaga encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <Button onClick={clearFilters}>Limpar Filtros</Button>
          </div>
        )}
      </motion.main>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowMobileFilters(false)}
        />
      )}
    </motion.div>
  );
}
