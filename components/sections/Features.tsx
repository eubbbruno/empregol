"use client";

import { motion } from "framer-motion";
import {
  User,
  Brain,
  Bell,
  BarChart3,
  Shield,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const features = [
  {
    icon: User,
    title: "Perfil Inteligente",
    description:
      "Preencha uma vez, candidate-se em qualquer vaga. Seu perfil se adapta automaticamente.",
    color: "purple",
    size: "large",
  },
  {
    icon: Brain,
    title: "Match com IA",
    description:
      "Algoritmo inteligente encontra as vagas perfeitas para você.",
    color: "cyan",
    size: "medium",
  },
  {
    icon: Bell,
    title: "Alertas Personalizados",
    description:
      "Receba notificações de vagas que combinam com seu perfil.",
    color: "orange",
    size: "medium",
  },
  {
    icon: BarChart3,
    title: "Tracker de Candidaturas",
    description:
      "Acompanhe o status de todas as suas candidaturas em tempo real.",
    color: "green",
    size: "medium",
  },
  {
    icon: Shield,
    title: "Privacidade Total",
    description:
      "Seus dados são protegidos. Empresas só veem o que você permite.",
    color: "purple",
    size: "medium",
  },
  {
    icon: Zap,
    title: "Resposta Rápida",
    description: "Empresas respondem em até 24h. Sem espera, sem ansiedade.",
    color: "orange",
    size: "medium",
  },
  {
    icon: Target,
    title: "Salário Transparente",
    description: "Veja o salário antes de se candidatar. Sem surpresas.",
    color: "cyan",
    size: "medium",
  },
  {
    icon: TrendingUp,
    title: "Análise de Mercado",
    description:
      "Insights sobre sua área, tendências salariais e demanda por skills.",
    color: "green",
    size: "large",
  },
];

const colorClasses = {
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    border: "border-purple-200",
    hover: "hover:border-purple-400",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    border: "border-orange-200",
    hover: "hover:border-orange-400",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "text-cyan-600",
    border: "border-cyan-200",
    hover: "hover:border-cyan-400",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
    border: "border-green-200",
    hover: "hover:border-green-400",
  },
};

export function Features() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Recursos que fazem a{" "}
              <span className="gradient-text-primary">diferença</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para encontrar o emprego dos seus sonhos
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colors =
                colorClasses[feature.color as keyof typeof colorClasses];
              const isLarge = feature.size === "large";

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className={`
                    ${isLarge ? "md:col-span-2" : "md:col-span-1"}
                    bg-white rounded-2xl p-8 border-2 ${colors.border} ${colors.hover}
                    shadow-sm hover:shadow-lg transition-all duration-300
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-6`}
                  >
                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
