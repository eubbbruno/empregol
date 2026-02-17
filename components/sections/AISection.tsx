"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, FileText, TrendingUp, Sparkles } from "lucide-react";

const aiFeatures = [
  {
    icon: Target,
    title: "Sugestão de Vagas",
    description: "IA analisa seu perfil e sugere as melhores oportunidades",
  },
  {
    icon: FileText,
    title: "Análise de Currículo",
    description: "Feedback instantâneo para melhorar seu CV",
  },
  {
    icon: TrendingUp,
    title: "Insights de Mercado",
    description: "Tendências salariais e demanda por skills em tempo real",
  },
];

export function AISection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#09090B] text-white relative overflow-hidden">
      {/* Green glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-green-600 rounded-full blur-[150px] opacity-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left side - Content (60%) */}
          <div className="lg:col-span-3 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-300">
                Powered by AI
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6"
            >
              Inteligência Artificial
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                trabalhando para você
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-xl"
            >
              Nossa IA aprende com suas preferências e te conecta com as
              oportunidades perfeitas. Match inteligente, recomendações
              personalizadas e insights em tempo real.
            </motion.p>

            {/* Mini cards inline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {aiFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-sm font-bold mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right side - Visual (40%) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 hidden lg:block"
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-green-500/20 shadow-2xl shadow-green-500/10">
              <Image
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80"
                alt="Inteligência Artificial"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
