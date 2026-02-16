"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "Crie seu Perfil",
    description:
      "Cadastre-se em menos de 2 minutos. Adicione suas habilidades, experiências e preferências de trabalho.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
  },
  {
    number: "02",
    title: "Encontre Vagas",
    description:
      "Nossa IA analisa seu perfil e recomenda as melhores oportunidades com match personalizado para você.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
  },
  {
    number: "03",
    title: "Candidate-se",
    description:
      "Envie sua candidatura com um clique. Acompanhe o status em tempo real e receba feedback rápido das empresas.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[#F8F9FC] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-4">
              Como <span className="text-green-600">funciona</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Três passos simples para transformar sua carreira
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connecting line - desktop only */}
            <div className="hidden md:block absolute top-48 left-1/4 right-1/4 h-px border-t-2 border-dashed border-green-300" />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative text-center"
              >
                {/* Image */}
                <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Number badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 font-bold text-2xl font-heading mb-4">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
