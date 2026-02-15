"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Briefcase, MapPin, DollarSign, Linkedin, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/toast";

export default function PerfilPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    nome_completo: "",
    titulo_profissional: "",
    resumo: "",
    cidade: "",
    estado: "",
    salario_pretendido: "",
    linkedin_url: "",
    telefone: "",
    skills: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        const { data: candidato } = await supabase
          .from("candidatos")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile || candidato) {
          setFormData({
            nome_completo: profile?.nome_completo || "",
            titulo_profissional: candidato?.titulo_profissional || "",
            resumo: candidato?.resumo || "",
            cidade: candidato?.cidade || "",
            estado: candidato?.estado || "",
            salario_pretendido: candidato?.salario_pretendido?.toString() || "",
            linkedin_url: candidato?.linkedin_url || "",
            telefone: candidato?.telefone || "",
            skills: candidato?.skills?.join(", ") || "",
          });
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Update profiles table
        await supabase
          .from("profiles")
          .update({ nome_completo: formData.nome_completo })
          .eq("id", user.id);

        // Update candidatos table
        await supabase
          .from("candidatos")
          .update({
            titulo_profissional: formData.titulo_profissional,
            resumo: formData.resumo,
            cidade: formData.cidade,
            estado: formData.estado,
            salario_pretendido: formData.salario_pretendido
              ? parseInt(formData.salario_pretendido)
              : null,
            linkedin_url: formData.linkedin_url,
            telefone: formData.telefone,
            skills: formData.skills
              ? formData.skills.split(",").map((s) => s.trim())
              : [],
          })
          .eq("id", user.id);

        addToast({
          type: "success",
          title: "Perfil atualizado!",
          message: "Suas informações foram salvas com sucesso",
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      addToast({
        type: "error",
        title: "Erro ao salvar",
        message: "Tente novamente mais tarde",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl"
    >
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
        <p className="text-gray-600">
          Mantenha suas informações atualizadas para receber melhores oportunidades
        </p>
      </motion.div>

      <motion.form
        variants={fadeInUp}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-8"
      >
        {/* Personal Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            Informações Pessoais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <Input
                type="text"
                value={formData.nome_completo}
                onChange={(e) =>
                  setFormData({ ...formData, nome_completo: e.target.value })
                }
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título Profissional
              </label>
              <Input
                type="text"
                placeholder="Ex: Desenvolvedor Full Stack"
                value={formData.titulo_profissional}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    titulo_profissional: e.target.value,
                  })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resumo Profissional
              </label>
              <textarea
                className="flex min-h-[120px] w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white"
                placeholder="Conte um pouco sobre sua experiência e objetivos profissionais..."
                value={formData.resumo}
                onChange={(e) =>
                  setFormData({ ...formData, resumo: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            Localização
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade
              </label>
              <Input
                type="text"
                placeholder="São Paulo"
                value={formData.cidade}
                onChange={(e) =>
                  setFormData({ ...formData, cidade: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <Input
                type="text"
                placeholder="SP"
                maxLength={2}
                value={formData.estado}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estado: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Professional Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-600" />
            Informações Profissionais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Salário Pretendido (R$)
              </label>
              <Input
                type="number"
                placeholder="8000"
                value={formData.salario_pretendido}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salario_pretendido: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Telefone
              </label>
              <Input
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Linkedin className="w-4 h-4 inline mr-1" />
                LinkedIn URL
              </label>
              <Input
                type="url"
                placeholder="https://linkedin.com/in/seu-perfil"
                value={formData.linkedin_url}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin_url: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills (separadas por vírgula)
              </label>
              <Input
                type="text"
                placeholder="React, TypeScript, Node.js, PostgreSQL"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            type="submit"
            size="lg"
            className="bg-gradient-primary text-white shadow-md"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </motion.form>
    </motion.div>
  );
}
