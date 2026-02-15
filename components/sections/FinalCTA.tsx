"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animations";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-orange-50" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-200 shadow-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Junte-se a +85.000 profissionais
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Pronto para dar o próximo{" "}
            <span className="gradient-text-primary">passo</span> na sua
            carreira?
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Crie sua conta gratuitamente e comece a receber oportunidades
            personalizadas hoje mesmo
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-cta hover:opacity-90 text-white px-8 text-lg shadow-xl group"
            >
              Sou Candidato
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="px-8 text-lg border-2 border-green-200 hover:border-green-400 bg-white"
            >
              Sou Empresa
              <Building2 className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 items-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>+85.000 usuários</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-600" />
              <span>+3.200 empresas</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              <span>98% satisfação</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
