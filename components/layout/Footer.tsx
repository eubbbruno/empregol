"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Heart } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const footerLinks = {
  produto: [
    { label: "Vagas", href: "/vagas" },
    { label: "Para Empresas", href: "/cadastro" },
    { label: "Preços", href: "/#pricing" },
  ],
  empresa: [
    { label: "Sobre Nós", href: "/#about" },
    { label: "Contato", href: "mailto:contato@empregol.com.br" },
  ],
  recursos: [
    { label: "Central de Ajuda", href: "/#faq" },
    { label: "Como Funciona", href: "/#how-it-works" },
  ],
  legal: [
    { label: "Privacidade", href: "#" },
    { label: "Termos de Uso", href: "#" },
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
    <footer className="relative bg-[#111827] text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12"
        >
          {/* Logo & Description */}
          <motion.div variants={fadeInUp} className="col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo-empreGol.svg"
                alt="EmpreGol"
                width={180}
                height={56}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              A plataforma que conecta talentos brasileiros às melhores
              oportunidades. Sem burocracia, sem enrolação.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-all"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-300" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={fadeInUp}>
              <h3 className="font-bold text-white mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} EmpreGol. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            Feito com <Heart className="w-4 h-4 text-green-500 fill-green-500" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
