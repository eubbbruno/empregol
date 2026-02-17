"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Brain,
  Bell,
  BarChart3,
  Shield,
  Zap,
  Target,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard Inteligente",
    description:
      "Acompanhe todas as suas candidaturas, visualizações de perfil e estatísticas em tempo real.",
    color: "green",
    size: "large",
    hasImage: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    icon: Brain,
    title: "Match com IA",
    description:
      "Algoritmo inteligente que encontra as vagas perfeitas baseado no seu perfil.",
    color: "blue",
    size: "large",
    hasImage: true,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
  },
  {
    icon: Bell,
    title: "Alertas Personalizados",
    description:
      "Receba notificações instantâneas de vagas que combinam com você.",
    color: "orange",
    size: "small",
  },
  {
    icon: Target,
    title: "Salário Transparente",
    description: "Veja o salário antes de se candidatar. Sem surpresas.",
    color: "cyan",
    size: "small",
  },
  {
    icon: Shield,
    title: "Privacidade Total",
    description:
      "Seus dados protegidos. Empresas só veem o que você permite.",
    color: "purple",
    size: "small",
  },
  {
    icon: Zap,
    title: "Resposta em 24h",
    description: "Empresas respondem rápido. Sem espera, sem ansiedade.",
    color: "pink",
    size: "small",
  },
];

const colorClasses = {
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "text-cyan-600",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
  },
  pink: {
    bg: "bg-pink-50",
    icon: "text-pink-600",
  },
};

export function Features() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-heading text-gray-900 mb-3 sm:mb-4">
              Recursos que fazem a{" "}
              <span className="text-green-600">diferença</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para encontrar o emprego dos seus sonhos
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colors =
                colorClasses[feature.color as keyof typeof colorClasses];
              const isLarge = feature.size === "large";

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -4, borderColor: "rgb(34, 197, 94)" }}
                  className={`
                    ${isLarge ? "sm:col-span-2 lg:row-span-2" : "sm:col-span-1"}
                    bg-white rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200
                    hover:shadow-lg transition-all duration-300 group
                    ${isLarge ? "sm:min-h-[400px]" : ""}
                  `}
                >
                  {/* Image for large cards */}
                  {feature.hasImage && feature.image && (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
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
