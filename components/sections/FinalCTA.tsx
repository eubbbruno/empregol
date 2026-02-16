"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-green-600 to-green-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
            Pronto para Marcar seu Gol?
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais e empresas que já encontraram
            suas oportunidades perfeitas
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/cadastro">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-50 px-8 text-lg shadow-xl font-semibold"
              >
                Sou Candidato
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button
                size="lg"
                variant="outline"
                className="px-8 text-lg border-2 border-white text-white hover:bg-white/10 font-semibold"
              >
                Sou Empresa
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center text-sm text-white/90">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Grátis para candidatos</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Teste grátis para empresas</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
