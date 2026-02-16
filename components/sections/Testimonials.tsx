"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

const featuredTestimonial = {
  name: "Ana Carolina Silva",
  role: "Desenvolvedora Full Stack",
  company: "Tech Solutions",
  image: "https://randomuser.me/api/portraits/women/1.jpg",
  content:
    "Consegui meu emprego dos sonhos em menos de 2 semanas usando o EmpreGol. O match com IA realmente funciona e me conectou com empresas que se alinhavam perfeitamente com minhas habilidades e expectativas. A transparência salarial foi fundamental para negociar uma proposta justa.",
  rating: 5,
};

const smallTestimonials = [
  {
    name: "Ricardo Mendes",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    content: "A transparência salarial me ajudou a negociar melhor. Plataforma incrível!",
  },
  {
    name: "Juliana Costa",
    role: "Designer UX/UI",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    content: "Interface linda e intuitiva. Encontrei várias vagas remotas perfeitas.",
  },
  {
    name: "Felipe Santos",
    role: "Engenheiro de Dados",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    content: "O tracker de candidaturas é sensacional. Sempre sei em que etapa estou.",
  },
  {
    name: "Mariana Oliveira",
    role: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    content: "Recebi 3 propostas em 1 mês. O EmpreGol realmente conecta com as empresas certas.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-green-50 relative overflow-hidden">
      {/* Decorative quotes */}
      <div className="absolute top-10 left-10 text-9xl font-serif text-green-200 opacity-50 select-none">
        &ldquo;
      </div>
      <div className="absolute bottom-10 right-10 text-9xl font-serif text-green-200 opacity-50 select-none rotate-180">
        &rdquo;
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-4">
            O que nossos usuários{" "}
            <span className="text-green-600">dizem</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Milhares de profissionais já encontraram suas oportunidades
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                <Image
                  src={featuredTestimonial.image}
                  alt={featuredTestimonial.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(featuredTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xl text-gray-700 leading-relaxed mb-6 max-w-3xl">
                &ldquo;{featuredTestimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div>
                <p className="font-bold text-gray-900 text-lg">
                  {featuredTestimonial.name}
                </p>
                <p className="text-gray-600">
                  {featuredTestimonial.role} • {featuredTestimonial.company}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Small Testimonials Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {smallTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              {/* Avatar */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <p className="text-sm text-gray-700 mb-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-600">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
