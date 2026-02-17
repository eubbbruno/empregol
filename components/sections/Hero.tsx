"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Sparkles, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Autocomplete } from "@/components/ui/Autocomplete";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const CARGO_SUGGESTIONS = [
  "Desenvolvedor Frontend",
  "Desenvolvedor Backend",
  "Desenvolvedor Fullstack",
  "Designer UI/UX",
  "Analista de Dados",
  "Product Manager",
  "Gerente de Projetos",
  "Analista de Marketing",
  "Vendedor",
  "Atendente",
  "Assistente Administrativo",
  "Contador",
  "Engenheiro",
  "Médico",
  "Enfermeiro",
  "Professor",
  "Advogado",
  "Recursos Humanos",
  "DevOps",
  "QA/Tester",
  "Scrum Master",
  "Tech Lead",
];

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
  "Manaus, AM",
  "Belém, PA",
  "Florianópolis, SC",
  "Campinas, SP",
  "Londrina, PR",
  "Maringá, PR",
  "Joinville, SC",
  "Uberlândia, MG",
  "Ribeirão Preto, SP",
  "Santos, SP",
  "Remoto",
];

export function Hero() {
  const router = useRouter();
  const [cargo, setCargo] = useState("");
  const [cidade, setCidade] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (cargo) params.set("q", cargo);
    if (cidade) params.set("cidade", cidade);
    router.push(`/vagas?${params.toString()}`);
  };
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden pt-20 sm:pt-24 lg:pt-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  +12.500 vagas ativas
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-5xl lg:text-7xl font-bold font-heading mb-6 leading-tight"
            >
              Seu próximo{" "}
              <span className="gradient-text-primary">gol profissional</span>{" "}
              começa aqui
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-xl text-gray-600 mb-8 max-w-xl"
            >
              Conecte-se com as melhores oportunidades do Brasil. Match
              inteligente, salários transparentes, zero burocracia.
            </motion.p>

            {/* Search bar */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="flex flex-col gap-3 p-3 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-2xl w-full">
                <Autocomplete
                  placeholder="Cargo ou palavra-chave"
                  suggestions={CARGO_SUGGESTIONS}
                  value={cargo}
                  onChange={setCargo}
                  icon={<Search className="w-5 h-5" />}
                  className="flex-1"
                />
                <Autocomplete
                  placeholder="Cidade ou remoto"
                  suggestions={CIDADE_SUGGESTIONS}
                  value={cidade}
                  onChange={setCidade}
                  icon={<MapPin className="w-5 h-5" />}
                  className="flex-1"
                />
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleSearch}
                  className="bg-gradient-cta hover:opacity-90 text-white px-8 shadow-lg w-full sm:w-auto"
                >
                  Buscar
                </Button>
              </div>
            </motion.div>

            {/* Stats badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 items-center"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  98% de satisfação
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <Zap className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">
                  Resposta em 24h
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Equipe profissional colaborando"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-200 max-w-xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">+2.500</p>
                  <p className="text-sm text-gray-600">
                    Contratações este mês
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
