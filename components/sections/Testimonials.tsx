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
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    content: "Encontrei minha vaga dos sonhos em menos de uma semana! O sistema de match da EmpreGol é incrível, me conectou com empresas que realmente se encaixam no meu perfil.",
    rating: 5,
  },
  {
    name: "Rafael Mendes",
    role: "Product Manager",
    company: "StartupXYZ",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael",
    content: "A plataforma é muito intuitiva e o processo de candidatura é rápido. Recebi 3 propostas em 2 semanas. Recomendo demais!",
    rating: 5,
  },
  {
    name: "Juliana Costa",
    role: "UX Designer",
    company: "Design Studio",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
    content: "Depois de meses procurando, finalmente achei uma empresa que valoriza design. O EmpreGol facilitou muito minha transição de carreira.",
    rating: 5,
  },
  {
    name: "Pedro Oliveira",
    role: "Engenheiro de Dados",
    company: "DataFlow Inc",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    content: "Impressionante como a IA sugere vagas relevantes. Economizei horas de busca e foquei apenas nas oportunidades certas para mim.",
    rating: 5,
  },
  {
    name: "Mariana Santos",
    role: "Tech Lead",
    company: "CloudTech",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    content: "Como recrutadora, o EmpreGol revolucionou nosso processo. Encontramos candidatos qualificados muito mais rápido.",
    rating: 5,
  },
  {
    name: "Lucas Ferreira",
    role: "DevOps Engineer",
    company: "InfraCloud",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    content: "A transparência no processo seletivo e o acompanhamento em tempo real fazem toda diferença. Plataforma top!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[var(--secondary-500)] opacity-10 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <div className="inline-block mb-4">
              <div className="glass rounded-full px-6 py-2 border border-[var(--glass-border)]">
                <span className="text-sm text-[var(--text-secondary)]">
                  💬 Depoimentos
                </span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[var(--text-primary)]">O Que Dizem</span>{" "}
              <span className="gradient-text-primary">Nossos Usuários</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Milhares de profissionais já transformaram suas carreiras com o EmpreGol
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="glass rounded-2xl p-6 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="w-12 h-12 text-[var(--primary-500)]" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--glass-border)]">
                    <div className="w-12 h-12 rounded-full overflow-hidden glass border border-[var(--glass-border)] relative">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[var(--text-primary)] font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-[var(--text-muted)]">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      boxShadow: "0 0 40px var(--primary-glow)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badge */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 border border-[var(--glass-border)]">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((t, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--bg-primary)] relative"
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
              <span className="text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--text-primary)] font-semibold">+12.500</span> profissionais satisfeitos
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
