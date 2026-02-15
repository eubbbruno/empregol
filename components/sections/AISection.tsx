"use client";

import { motion } from "framer-motion";
import { Brain, FileText, TrendingUp, Sparkles, Zap, Target } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

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
  {
    icon: Zap,
    title: "Match Inteligente",
    description: "Score de compatibilidade com cada vaga",
  },
];

export function AISection() {
  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Purple glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-600 rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-300">
                Powered by AI
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Inteligência Artificial
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                trabalhando para você
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Nossa IA aprende com suas preferências e te conecta com as
              oportunidades perfeitas
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Demo Visual */}
          <motion.div
            variants={fadeInUp}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">EmpreGol AI</h3>
                  <p className="text-gray-400">
                    Analisando 12.500+ vagas em tempo real
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Análise de perfil", progress: 100 },
                  { label: "Match com vagas", progress: 87 },
                  { label: "Recomendações personalizadas", progress: 95 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">{item.label}</span>
                      <span className="text-green-400 font-semibold">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
