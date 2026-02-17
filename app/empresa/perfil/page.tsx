"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Building2, Globe, MapPin, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/toast";

const SETORES = [
  "Tecnologia",
  "Saúde",
  "Educação",
  "Financeiro",
  "Varejo",
  "Indústria",
  "Serviços",
  "Agronegócio",
  "Construção",
  "Outro",
];

const TAMANHOS = [
  "1-10 funcionários",
  "11-50 funcionários",
  "51-200 funcionários",
  "201-500 funcionários",
  "501-1000 funcionários",
  "1000+ funcionários",
];

export default function EmpresaPerfilPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    nome_empresa: "",
    cnpj: "",
    setor: "",
    tamanho: "",
    website: "",
    descricao: "",
    cidade: "",
    estado: "",
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

        const { data: empresa } = await supabase
          .from("empresas")
          .select("*")
          .eq("id", user.id)
          .single();

        setFormData({
          nome_empresa: (empresa as any)?.nome_empresa || "",
          cnpj: (empresa as any)?.cnpj || "",
          setor: (empresa as any)?.setor || "",
          tamanho: (empresa as any)?.tamanho || "",
          website: (empresa as any)?.website || "",
          descricao: (empresa as any)?.descricao || "",
          cidade: (profile as any)?.cidade || "",
          estado: (profile as any)?.estado || "",
        });
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
        await (supabase.from("profiles") as any).update({
          cidade: formData.cidade || null,
          estado: formData.estado || null,
        }).eq("id", user.id);

        // Update empresas table
        await (supabase.from("empresas") as any).update({
          nome_empresa: formData.nome_empresa,
          cnpj: formData.cnpj || null,
          setor: formData.setor || null,
          tamanho: formData.tamanho || null,
          website: formData.website || null,
          descricao: formData.descricao || null,
        }).eq("id", user.id);

        addToast({
          type: "success",
          title: "Perfil atualizado!",
          description: "As informações da empresa foram salvas com sucesso",
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      addToast({
        type: "error",
        title: "Erro ao salvar",
        description: "Tente novamente mais tarde",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Perfil da Empresa
        </h1>
        <p className="text-gray-600">
          Mantenha as informações da sua empresa atualizadas
        </p>
      </motion.div>

      <motion.form
        variants={fadeInUp}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-8"
      >
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Informações da Empresa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Empresa *
              </label>
              <Input
                type="text"
                value={formData.nome_empresa}
                onChange={(e) =>
                  setFormData({ ...formData, nome_empresa: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CNPJ
              </label>
              <Input
                type="text"
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={(e) =>
                  setFormData({ ...formData, cnpj: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Setor
              </label>
              <select
                value={formData.setor}
                onChange={(e) =>
                  setFormData({ ...formData, setor: e.target.value })
                }
                className="flex h-11 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
              >
                <option value="">Selecione...</option>
                {SETORES.map((setor) => (
                  <option key={setor} value={setor}>
                    {setor}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Tamanho da Empresa
              </label>
              <select
                value={formData.tamanho}
                onChange={(e) =>
                  setFormData({ ...formData, tamanho: e.target.value })
                }
                className="flex h-11 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
              >
                <option value="">Selecione...</option>
                {TAMANHOS.map((tamanho) => (
                  <option key={tamanho} value={tamanho}>
                    {tamanho}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Website
              </label>
              <Input
                type="url"
                placeholder="https://suaempresa.com.br"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição da Empresa
              </label>
              <textarea
                className="flex min-h-[120px] w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
                placeholder="Conte um pouco sobre sua empresa, cultura e valores..."
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
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

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            type="submit"
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
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
