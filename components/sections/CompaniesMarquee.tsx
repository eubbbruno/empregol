"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

// Logos fictícias de empresas brasileiras
const companies = [
  { name: "TechBrasil", color: "#6D28D9" },
  { name: "InovaSoft", color: "#06B6D4" },
  { name: "DataFlow", color: "#F97316" },
  { name: "CloudTech", color: "#10B981" },
  { name: "StartupXYZ", color: "#8B5CF6" },
  { name: "DevHub", color: "#22D3EE" },
  { name: "CodeLab", color: "#FACC15" },
  { name: "AppMakers", color: "#A855F7" },
  { name: "WebSolutions", color: "#34D399" },
  { name: "DigitalCo", color: "#FB923C" },
  { name: "TechFlow", color: "#C4B5FD" },
  { name: "InnovaHub", color: "#FDE047" },
];

function CompanyLogo({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex-shrink-0 mx-8">
      <div className="glass rounded-2xl px-8 py-6 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all group">
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}dd)`,
            }}
          >
            {name.charAt(0)}
          </div>
          {/* Company Name */}
          <span className="text-[var(--text-primary)] font-semibold text-lg whitespace-nowrap">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CompaniesMarquee() {
  // Duplicar array para loop infinito suave
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="glass rounded-full px-6 py-2 border border-[var(--glass-border)]">
                <span className="text-sm text-[var(--text-secondary)]">
                  🏢 Empresas Parceiras
                </span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-primary">Empresas</span>{" "}
              <span className="text-[var(--text-primary)]">que Confiam</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Conectamos você com as melhores empresas do Brasil
            </p>
          </motion.div>

          {/* Marquee Container */}
          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

            {/* Marquee */}
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{
                  x: [0, -50 * companies.length * 8], // Ajustar baseado no tamanho
                }}
                transition={{
                  x: {
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedCompanies.map((company, index) => (
                  <CompanyLogo key={index} {...company} />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Below */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {[
              { value: "3.200+", label: "Empresas Ativas" },
              { value: "150+", label: "Novas por Mês" },
              { value: "98%", label: "Satisfação" },
              { value: "5.000+", label: "Vagas Publicadas" },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 border border-[var(--glass-border)] text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
