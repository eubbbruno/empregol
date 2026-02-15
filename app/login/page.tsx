"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Chrome, Github, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/toast";
import { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    lembrar: false,
  });
  const router = useRouter();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.senha,
      });

      if (error) throw error;

      if (data.user) {
        // Get user profile to determine redirect
        const { data: profile } = await supabase
          .from("profiles")
          .select("tipo")
          .eq("id", data.user.id)
          .single();

        addToast({
          type: "success",
          title: "Login realizado!",
          description: "Redirecionando...",
        });

        // Redirect based on user type
        const profileData = profile as Profile | null;
        if (profileData?.tipo === "empresa") {
          router.push("/empresa/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      addToast({
        type: "error",
        title: "Erro ao fazer login",
        description: err.message || "Verifique suas credenciais",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Form */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center px-6 py-12 lg:px-16 bg-white"
      >
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
                <span className="text-2xl">⚡</span>
              </div>
              <span className="text-2xl font-bold gradient-text-primary">
                EmpreGol
              </span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo de volta!
            </h1>
            <p className="text-gray-600">
              Entre para acessar sua conta e continuar sua jornada
            </p>
          </motion.div>

          {/* Social Login */}
          <motion.div variants={fadeInUp} className="space-y-3 mb-6">
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-center"
              disabled
              title="Em breve"
            >
              <Chrome className="w-5 h-5" />
              Continuar com Google
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-center"
              disabled
              title="Em breve"
            >
              <Github className="w-5 h-5" />
              Continuar com GitHub
            </Button>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeInUp} className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                ou entre com email
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={staggerContainer}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.senha}
                  onChange={(e) =>
                    setFormData({ ...formData, senha: e.target.value })
                  }
                  required
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  checked={formData.lembrar}
                  onChange={(e) =>
                    setFormData({ ...formData, lembrar: e.target.checked })
                  }
                />
                <span className="text-sm text-gray-600">Lembrar de mim</span>
              </label>
              <Link
                href="/recuperar-senha"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Esqueceu a senha?
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-primary text-white shadow-md"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>

          {/* Footer */}
          <motion.p
            variants={fadeInUp}
            className="mt-8 text-center text-sm text-gray-600"
          >
            Não tem uma conta?{" "}
            <Link
              href="/cadastro"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Cadastre-se grátis
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-orange-50 p-12 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-20" />

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-200 shadow-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">
              +85.000 profissionais ativos
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Sua próxima oportunidade está a um{" "}
            <span className="gradient-text-primary">clique</span> de distância
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Acesse vagas exclusivas, receba recomendações personalizadas e
            acompanhe suas candidaturas em tempo real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
              alt="Profissionais trabalhando"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
