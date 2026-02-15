"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, Grid3x3, List } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VagaCard } from "@/components/cards/VagaCard";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Mock data
const vagasMock = [
  {
    id: "1",
    titulo: "Desenvolvedor Full Stack Sênior",
    empresa: "TechCorp Brasil",
    localizacao: "São Paulo, SP",
    tipo: "CLT" as const,
    nivel: "Sênior" as const,
    salario: { min: 12000, max: 18000 },
    remoto: true,
    publicadoEm: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    tags: ["React", "Node.js", "TypeScript", "AWS"],
    matchScore: 92,
    verificada: true,
  },
  {
    id: "2",
    titulo: "Designer UI/UX",
    empresa: "Creative Studio",
    localizacao: "Rio de Janeiro, RJ",
    tipo: "PJ" as const,
    nivel: "Pleno" as const,
    salario: { min: 8000, max: 12000 },
    remoto: true,
    publicadoEm: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    tags: ["Figma", "Design System", "Prototyping"],
    matchScore: 85,
    verificada: true,
  },
  {
    id: "3",
    titulo: "Engenheiro de Dados",
    empresa: "DataFlow Inc",
    localizacao: "Remoto",
    tipo: "CLT" as const,
    nivel: "Sênior" as const,
    salario: { min: 15000, max: 22000 },
    remoto: true,
    publicadoEm: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    tags: ["Python", "SQL", "Apache Spark", "Airflow"],
    matchScore: 78,
    verificada: false,
  },
  {
    id: "4",
    titulo: "Product Manager",
    empresa: "StartupXYZ",
    localizacao: "Belo Horizonte, MG",
    tipo: "CLT" as const,
    nivel: "Pleno" as const,
    salario: { min: 10000, max: 15000 },
    remoto: false,
    publicadoEm: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["Agile", "Roadmap", "Analytics"],
    verificada: true,
  },
  {
    id: "5",
    titulo: "DevOps Engineer",
    empresa: "CloudTech",
    localizacao: "Remoto",
    tipo: "PJ" as const,
    nivel: "Sênior" as const,
    salario: { min: 14000, max: 20000 },
    remoto: true,
    publicadoEm: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["Kubernetes", "Docker", "CI/CD", "Terraform"],
    matchScore: 88,
    verificada: true,
  },
  {
    id: "6",
    titulo: "Desenvolvedor Mobile React Native",
    empresa: "AppMakers",
    localizacao: "Curitiba, PR",
    tipo: "CLT" as const,
    nivel: "Júnior" as const,
    salario: { min: 5000, max: 8000 },
    remoto: true,
    publicadoEm: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    tags: ["React Native", "JavaScript", "Mobile"],
    verificada: false,
  },
];

export default function VagasPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text-primary">Explore</span>{" "}
                <span className="text-[var(--text-primary)]">Oportunidades</span>
              </h1>
              <p className="text-xl text-[var(--text-secondary)]">
                {vagasMock.length.toLocaleString("pt-BR")} vagas disponíveis
              </p>
            </motion.div>

            {/* Search & Filters Bar */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="glass rounded-2xl p-4 border border-[var(--glass-border)]">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-[var(--glass-bg-hover)] transition-colors">
                    <Search className="w-5 h-5 text-[var(--primary-500)]" />
                    <input
                      type="text"
                      placeholder="Cargo, empresa ou palavra-chave"
                      className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
                    />
                  </div>

                  {/* Location Input */}
                  <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-[var(--glass-bg-hover)] transition-colors">
                    <MapPin className="w-5 h-5 text-[var(--secondary-500)]" />
                    <input
                      type="text"
                      placeholder="Cidade ou remoto"
                      className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
                    />
                  </div>

                  {/* Filter Button */}
                  <Button
                    variant="secondary"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:w-auto"
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    Filtros
                  </Button>

                  {/* Search Button */}
                  <Button variant="default" className="lg:w-auto">
                    Buscar
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <div className="glass rounded-2xl p-6 border border-[var(--glass-border)]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Tipo de Contrato
                      </label>
                      <div className="space-y-2">
                        {["CLT", "PJ", "Estágio", "Freelance"].map((tipo) => (
                          <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-[var(--glass-border)] bg-transparent"
                            />
                            <span className="text-sm text-[var(--text-secondary)]">
                              {tipo}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Nível
                      </label>
                      <div className="space-y-2">
                        {["Júnior", "Pleno", "Sênior", "Especialista"].map((nivel) => (
                          <label key={nivel} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-[var(--glass-border)] bg-transparent"
                            />
                            <span className="text-sm text-[var(--text-secondary)]">
                              {nivel}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Modelo de Trabalho
                      </label>
                      <div className="space-y-2">
                        {["Remoto", "Presencial", "Híbrido"].map((modelo) => (
                          <label key={modelo} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-[var(--glass-border)] bg-transparent"
                            />
                            <span className="text-sm text-[var(--text-secondary)]">
                              {modelo}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Results Header */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-[var(--text-secondary)]">
                  Mostrando <span className="text-[var(--text-primary)] font-semibold">{vagasMock.length}</span> vagas
                </span>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-[var(--glass-bg)] text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-[var(--glass-bg)] text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Vagas Grid */}
            <motion.div
              variants={staggerContainer}
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 lg:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {vagasMock.map((vaga) => (
                <motion.div key={vaga.id} variants={fadeInUp}>
                  <VagaCard {...vaga} />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            <motion.div
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <Button variant="secondary" size="lg">
                Carregar Mais Vagas
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
