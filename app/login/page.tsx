"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full bg-[var(--primary-700)] opacity-20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[var(--secondary-500)] opacity-15 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -50, 0],
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:block"
          >
            <motion.div variants={fadeInUp}>
              <Link href="/" className="flex items-center gap-3 mb-8 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
                  <span className="text-3xl">⚡</span>
                </div>
                <span className="text-3xl font-bold gradient-text-primary">
                  EmpreGol
                </span>
              </Link>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text-primary">Bem-vindo</span>
              <br />
              <span className="text-[var(--text-primary)]">de volta!</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-[var(--text-secondary)] mb-8"
            >
              Continue sua jornada profissional. Milhares de oportunidades estão
              esperando por você.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-4">
              {[
                "✓ Acesso a +5.000 vagas exclusivas",
                "✓ Match inteligente com IA",
                "✓ Candidatura em 1 clique",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-[var(--text-secondary)]"
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--success-500)]" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-3xl p-8 md:p-12 border border-[var(--glass-border)]">
              {/* Mobile Logo */}
              <Link
                href="/"
                className="flex lg:hidden items-center gap-3 mb-8 justify-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
                  <span className="text-2xl">⚡</span>
                </div>
                <span className="text-2xl font-bold gradient-text-primary">
                  EmpreGol
                </span>
              </Link>

              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                Entrar na Conta
              </h2>
              <p className="text-[var(--text-secondary)] mb-8">
                Não tem uma conta?{" "}
                <Link
                  href="/cadastro"
                  className="text-[var(--primary-500)] hover:text-[var(--primary-400)] font-semibold transition-colors"
                >
                  Cadastre-se grátis
                </Link>
              </p>

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
                    ou continue com email
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form className="space-y-5">
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
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[var(--text-primary)]"
                    >
                      Senha
                    </label>
                    <Link
                      href="/recuperar-senha"
                      className="text-sm text-[var(--primary-500)] hover:text-[var(--primary-400)] transition-colors"
                    >
                      Esqueceu?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-12"
                    />
                  </div>
                </div>

                <Button type="submit" variant="default" size="lg" className="w-full">
                  Entrar
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>

              {/* Footer */}
              <p className="text-center text-sm text-[var(--text-muted)] mt-8">
                Ao continuar, você concorda com nossos{" "}
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
        </div>
      </div>
    </main>
  );
}
