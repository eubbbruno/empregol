"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User,
  Building2,
  Mail,
  Lock,
  ArrowRight,
  Github,
  Chrome,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

type UserType = "candidate" | "company" | null;

export default function CadastroPage() {
  const [userType, setUserType] = useState<UserType>(null);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[var(--primary-700)] opacity-20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[var(--accent-hot)] opacity-15 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <AnimatePresence mode="wait">
          {!userType ? (
            // User Type Selection
            <motion.div
              key="selection"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              {/* Logo */}
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Link href="/" className="inline-flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <span className="text-3xl font-bold gradient-text-primary">
                    EmpreGol
                  </span>
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-[var(--text-primary)]">Comece sua</span>{" "}
                  <span className="gradient-text-primary">Jornada</span>
                </h1>
                <p className="text-xl text-[var(--text-secondary)]">
                  Escolha como você quer usar o EmpreGol
                </p>
              </motion.div>

              {/* User Type Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Candidate Card */}
                <motion.div variants={scaleIn}>
                  <motion.button
                    onClick={() => setUserType("candidate")}
                    className="w-full glass rounded-3xl p-8 border border-[var(--glass-border)] hover:border-[var(--primary-500)] transition-all text-left group"
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 glow-primary">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                      Sou Candidato
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-6">
                      Encontre seu próximo emprego dos sonhos. Candidate-se a
                      milhares de vagas com um clique.
                    </p>
                    <div className="space-y-2">
                      {[
                        "100% Grátis para sempre",
                        "Match inteligente com IA",
                        "Alertas personalizados",
                      ].map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--success-500)]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-[var(--primary-500)] font-semibold group-hover:gap-3 transition-all">
                      <span>Continuar como candidato</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.button>
                </motion.div>

                {/* Company Card */}
                <motion.div variants={scaleIn}>
                  <motion.button
                    onClick={() => setUserType("company")}
                    className="w-full glass rounded-3xl p-8 border border-[var(--glass-border)] hover:border-[var(--secondary-500)] transition-all text-left group"
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--secondary-500)] to-[var(--secondary-400)] flex items-center justify-center mb-6 shadow-[0_0_30px_var(--secondary-glow)]">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                      Sou Empresa
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-6">
                      Encontre os melhores talentos para sua empresa. Publique
                      vagas e receba candidatos qualificados.
                    </p>
                    <div className="space-y-2">
                      {[
                        "14 dias grátis para testar",
                        "Filtros inteligentes",
                        "Dashboard completo",
                      ].map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-500)]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-[var(--secondary-500)] font-semibold group-hover:gap-3 transition-all">
                      <span>Continuar como empresa</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.button>
                </motion.div>
              </div>

              {/* Login Link */}
              <motion.p
                variants={fadeInUp}
                className="text-center text-[var(--text-secondary)] mt-8"
              >
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="text-[var(--primary-500)] hover:text-[var(--primary-400)] font-semibold transition-colors"
                >
                  Fazer login
                </Link>
              </motion.p>
            </motion.div>
          ) : (
            // Registration Form
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="glass rounded-3xl p-8 md:p-12 border border-[var(--glass-border)]">
                {/* Back Button */}
                <button
                  onClick={() => setUserType(null)}
                  className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span className="text-sm">Voltar</span>
                </button>

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      userType === "candidate"
                        ? "bg-gradient-primary glow-primary"
                        : "bg-gradient-to-br from-[var(--secondary-500)] to-[var(--secondary-400)] shadow-[0_0_30px_var(--secondary-glow)]"
                    }`}
                  >
                    {userType === "candidate" ? (
                      <User className="w-7 h-7 text-white" />
                    ) : (
                      <Building2 className="w-7 h-7 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                      {userType === "candidate" ? "Criar Conta" : "Criar Conta Empresa"}
                    </h2>
                    <p className="text-[var(--text-secondary)]">
                      {userType === "candidate"
                        ? "Comece sua jornada profissional"
                        : "Encontre os melhores talentos"}
                    </p>
                  </div>
                </div>

                {/* Social Login */}
                <div className="space-y-3 mb-8">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    animated={false}
                  >
                    <Chrome className="w-5 h-5" />
                    Continuar com Google
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    animated={false}
                  >
                    <Github className="w-5 h-5" />
                    Continuar com GitHub
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--glass-border)]" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[var(--bg-primary)] text-[var(--text-muted)]">
                      ou cadastre-se com email
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form className="space-y-5">
                  {userType === "company" && (
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                      >
                        Nome da Empresa
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                        <Input
                          id="company"
                          type="text"
                          placeholder="Sua Empresa Ltda"
                          className="pl-12"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                    >
                      {userType === "candidate" ? "Nome Completo" : "Seu Nome"}
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="João Silva"
                        className="pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                    >
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-12"
                      />
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-2">
                      Mínimo 8 caracteres
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full"
                  >
                    Criar Conta
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-[var(--text-muted)] mt-8">
                  Ao criar uma conta, você concorda com nossos{" "}
                  <Link
                    href="/termos"
                    className="text-[var(--primary-500)] hover:underline"
                  >
                    Termos de Uso
                  </Link>{" "}
                  e{" "}
                  <Link
                    href="/privacidade"
                    className="text-[var(--primary-500)] hover:underline"
                  >
                    Política de Privacidade
                  </Link>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
