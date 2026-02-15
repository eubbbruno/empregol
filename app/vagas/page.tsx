"use client";

import { motion } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, Grid3x3, List } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VagaCard } from "@/components/cards/VagaCard";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";

const mockVagas = [
  {
    id: "1",
    titulo: "Desenvolvedor Full Stack Sênior",
    empresa: "TechCorp Brasil",
    logoEmpresa: "https://api.dicebear.com/7.x/initials/svg?seed=TC&backgroundColor=8B5CF6",
    localizacao: "São Paulo, SP",
    tipo: "CLT" as const,
    nivel: "Sênior" as const,
    salario: "R$ 12.000 - R$ 18.000",
    remoto: true,
    publicadoEm: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    matchScore: 95,
    verificada: true,
  },
  {
    id: "2",
    titulo: "Designer UX/UI Pleno",
    empresa: "Creative Agency",
    logoEmpresa: "https://api.dicebear.com/7.x/initials/svg?seed=CA&backgroundColor=F97316",
    localizacao: "Remoto",
    tipo: "PJ" as const,
    nivel: "Pleno" as const,
    salario: "R$ 8.000 - R$ 12.000",
    remoto: true,
    publicadoEm: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ["Figma", "UI Design", "Prototyping", "Design System"],
    matchScore: 88,
    verificada: true,
  },
  {
    id: "3",
    titulo: "Product Manager",
    empresa: "Startup XYZ",
    logoEmpresa: "https://api.dicebear.com/7.x/initials/svg?seed=SX&backgroundColor=06B6D4",
    localizacao: "Rio de Janeiro, RJ",
    tipo: "CLT" as const,
    nivel: "Sênior" as const,
    salario: "R$ 15.000 - R$ 22.000",
    remoto: false,
    publicadoEm: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tags: ["Product Strategy", "Agile", "Roadmap", "Analytics"],
    matchScore: 82,
    verificada: false,
  },
];

export default function VagasPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Encontre sua próxima{" "}
                <span className="gradient-text-primary">oportunidade</span>
              </h1>
              <p className="text-xl text-gray-600">
                {mockVagas.length.toLocaleString("pt-BR")} vagas disponíveis
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Cargo, empresa ou palavra-chave"
                      className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Cidade ou remoto"
                      className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="bg-gradient-primary text-white shadow-md lg:w-auto"
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Filters & View Toggle */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between mb-6"
            >
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filtros
              </Button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de contrato
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Todos</option>
                      <option>CLT</option>
                      <option>PJ</option>
                      <option>Estágio</option>
                      <option>Freelancer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nível
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Todos</option>
                      <option>Estágio</option>
                      <option>Júnior</option>
                      <option>Pleno</option>
                      <option>Sênior</option>
                      <option>Liderança</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modelo de trabalho
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Todos</option>
                      <option>Remoto</option>
                      <option>Presencial</option>
                      <option>Híbrido</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Vagas Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {mockVagas.map((vaga, index) => (
                <motion.div
                  key={vaga.id}
                  variants={fadeInUp}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                >
                  <VagaCard {...vaga} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
