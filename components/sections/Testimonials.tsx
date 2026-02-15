"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    name: "Ana Carolina Silva",
    role: "Desenvolvedora Full Stack",
    company: "Tech Solutions",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    content:
      "Consegui meu emprego dos sonhos em menos de 2 semanas. O match com IA realmente funciona!",
    rating: 5,
  },
  {
    name: "Ricardo Mendes",
    role: "Product Manager",
    company: "Startup XYZ",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    content:
      "A transparência salarial me ajudou a negociar melhor. Plataforma incrível!",
    rating: 5,
  },
  {
    name: "Juliana Costa",
    role: "Designer UX/UI",
    company: "Creative Agency",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    content:
      "Interface linda e intuitiva. Encontrei várias vagas remotas perfeitas para mim.",
    rating: 5,
  },
  {
    name: "Felipe Santos",
    role: "Engenheiro de Dados",
    company: "Data Corp",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    content:
      "O tracker de candidaturas é sensacional. Sempre sei em que etapa estou.",
    rating: 5,
  },
  {
    name: "Mariana Oliveira",
    role: "Marketing Manager",
    company: "Growth Co",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    content:
      "Recebi 3 propostas em 1 mês. O EmpreGol realmente conecta com as empresas certas.",
    rating: 5,
  },
  {
    name: "Lucas Ferreira",
    role: "DevOps Engineer",
    company: "Cloud Systems",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    content:
      "Suporte rápido, vagas de qualidade e processo simples. Recomendo!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-[var(--bg-tertiary)] relative overflow-hidden">
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
              O que nossos usuários{" "}
              <span className="gradient-text-primary">dizem</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Milhares de profissionais já encontraram suas oportunidades
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 text-green-600" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badge */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 border border-gray-200 shadow-sm">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((t, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-white relative"
                  >
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-700">
                <span className="text-gray-900 font-semibold">+12.500</span>{" "}
                profissionais satisfeitos
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
