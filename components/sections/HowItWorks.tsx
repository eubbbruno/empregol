"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Rocket } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Crie seu perfil",
    description:
      "Cadastre-se em menos de 2 minutos. Adicione suas habilidades, experiências e preferências.",
    color: "purple",
  },
  {
    icon: Search,
    number: "02",
    title: "Encontre vagas perfeitas",
    description:
      "Nossa IA analisa seu perfil e recomenda as melhores oportunidades com match personalizado.",
    color: "orange",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Candidate-se e decole",
    description:
      "Envie sua candidatura com um clique. Acompanhe o status em tempo real e receba feedback rápido.",
    color: "cyan",
  },
];

const colorClasses = {
  purple: {
    bg: "bg-green-600",
    light: "bg-green-100",
    text: "text-green-600",
    ring: "ring-green-200",
  },
  orange: {
    bg: "bg-orange-600",
    light: "bg-orange-100",
    text: "text-orange-600",
    ring: "ring-orange-200",
  },
  cyan: {
    bg: "bg-cyan-600",
    light: "bg-cyan-100",
    text: "text-cyan-600",
    ring: "ring-cyan-200",
  },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[var(--bg-tertiary)] relative overflow-hidden">
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
              Como <span className="gradient-text-primary">funciona</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Três passos simples para transformar sua carreira
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connecting line - desktop only */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-green-300 via-orange-300 to-cyan-300 opacity-30" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              const colors = colorClasses[step.color as keyof typeof colorClasses];

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 relative z-10">
                    {/* Number badge */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-20 h-20 rounded-2xl ${colors.light} flex items-center justify-center mb-6 ring-4 ${colors.ring}`}
                    >
                      <Icon className={`w-10 h-10 ${colors.text}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
