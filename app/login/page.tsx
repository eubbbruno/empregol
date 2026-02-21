"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/toast";
import { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "facebook" | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    lembrar: false,
  });
  const router = useRouter();
  const { addToast } = useToast();

  const handleOAuthLogin = async (provider: "google" | "facebook") => {
    setOauthLoading(provider);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: unknown) {
      const err = error as { message?: string };
      addToast({
        type: "error",
        title: "Erro ao fazer login",
        description: err.message || "Tente novamente",
      });
      setOauthLoading(null);
    }
  };

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
        className="flex flex-col justify-center px-4 sm:px-6 py-8 pt-20 lg:pt-12 lg:px-16 bg-white"
      >
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <motion.div variants={fadeInUp} className="mb-6 sm:mb-8 text-center lg:text-left">
            <Link href="/" className="inline-flex items-center">
              <Image 
                src="/logo-empreGol-paths.svg" 
                alt="EmpreGol" 
                width={220} 
                height={72} 
                className="h-12 sm:h-14 lg:h-16 w-auto"
              />
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-6 sm:mb-8 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo de volta!
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Entre para acessar sua conta e continuar sua jornada
            </p>
          </motion.div>

          {/* Social Login */}
          <motion.div variants={fadeInUp} className="space-y-3 mb-4 sm:mb-6">
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-center hover:bg-gray-50 hover:shadow-md transition-all"
              onClick={() => handleOAuthLogin("google")}
              disabled={oauthLoading !== null}
            >
              {oauthLoading === "google" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuar com Google
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-center hover:bg-gray-50 hover:shadow-md transition-all"
              onClick={() => handleOAuthLogin("facebook")}
              disabled={oauthLoading !== null}
            >
              {oauthLoading === "facebook" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continuar com Facebook
                </>
              )}
            </Button>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeInUp} className="relative mb-4 sm:mb-6">
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
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={formData.lembrar}
                  onChange={(e) =>
                    setFormData({ ...formData, lembrar: e.target.checked })
                  }
                />
                <span className="text-sm text-gray-600">Lembrar de mim</span>
              </label>
              <Link
                href="/recuperar-senha"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
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
            className="mt-6 sm:mt-8 text-center text-sm text-gray-600"
          >
            Não tem uma conta?{" "}
            <Link
              href="/cadastro"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Cadastre-se grátis
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50 p-12 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-20" />

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-200 shadow-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
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
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
