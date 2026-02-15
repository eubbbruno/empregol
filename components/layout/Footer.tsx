"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Mail, Heart } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const footerLinks = {
  produto: [
    { label: "Vagas", href: "/vagas" },
    { label: "Para Empresas", href: "/empresas" },
    { label: "Preços", href: "/precos" },
    { label: "API", href: "/api" },
  ],
  empresa: [
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Carreiras", href: "/carreiras" },
    { label: "Contato", href: "/contato" },
  ],
  recursos: [
    { label: "Central de Ajuda", href: "/ajuda" },
    { label: "Guias", href: "/guias" },
    { label: "Status", href: "/status" },
    { label: "Changelog", href: "/changelog" },
  ],
  legal: [
    { label: "Privacidade", href: "/privacidade" },
    { label: "Termos de Uso", href: "/termos" },
    { label: "Cookies", href: "/cookies" },
    { label: "LGPD", href: "/lgpd" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/empregol", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/empregol", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/empregol", label: "Instagram" },
  { icon: Github, href: "https://github.com/empregol", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--glass-border)] mt-32">
      {/* Gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary-500)] to-transparent opacity-50" />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12"
        >
          {/* Logo & Description */}
          <motion.div variants={fadeInUp} className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
                <span className="text-2xl">⚡</span>
              </div>
              <span className="text-xl font-bold gradient-text-primary">
                EmpreGol
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-xs">
              Conectamos talentos brasileiros às melhores oportunidades. Sem burocracia, sem enrolação.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass glass-hover flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-[var(--text-primary)] font-semibold mb-4">Produto</h3>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-[var(--text-primary)] font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-[var(--text-primary)] font-semibold mb-4">Recursos</h3>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-[var(--text-primary)] font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[var(--text-primary)] font-semibold mb-1">
                  Fique por dentro das novidades
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Receba vagas e dicas de carreira no seu email
                </p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl glass border border-[var(--glass-border)] focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[var(--primary-glow)] bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all"
              />
              <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold glow-primary hover:shadow-[0_0_40px_var(--primary-glow)] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Inscrever
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--glass-border)]"
        >
          <p className="text-[var(--text-secondary)] text-sm text-center md:text-left">
            © {new Date().getFullYear()} EmpreGol. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-[var(--primary-500)] fill-current animate-pulse" />
            <span>no Brasil</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
