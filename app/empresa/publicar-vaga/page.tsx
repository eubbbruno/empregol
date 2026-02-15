"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Save,
  Loader2,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/toast";

export default function PublicarVagaPage() {
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    requisitos: "",
    beneficios: "",
    tipo_contrato: "clt",
    modelo_trabalho: "hibrido",
    cidade: "",
    estado: "",
    salario_min: "",
    salario_max: "",
    mostra_salario: true,
    nivel: "pleno",
    area: "",
    skills_requeridas: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const { data, error } = await supabase.from("vagas").insert([{
        empresa_id: user.id,
        titulo: formData.titulo,
        descricao: formData.descricao,
        requisitos: formData.requisitos,
        beneficios: formData.beneficios || null,
        tipo_contrato: formData.tipo_contrato,
        modelo_trabalho: formData.modelo_trabalho,
        cidade: formData.cidade,
        estado: formData.estado,
        salario_min: formData.salario_min
          ? parseInt(formData.salario_min)
          : null,
        salario_max: formData.salario_max
          ? parseInt(formData.salario_max)
          : null,
        mostra_salario: formData.mostra_salario,
        nivel: formData.nivel,
        area: formData.area,
        skills_requeridas: formData.skills_requeridas
          ? formData.skills_requeridas.split(",").map((s) => s.trim())
          : null,
        status: "ativa",
      }] as any).select();

      if (error) throw error;

      addToast({
        type: "success",
        title: "Vaga publicada!",
        description: "Sua vaga está disponível para candidatos",
      });

      router.push("/empresa/dashboard");
    } catch (error) {
      console.error("Error publishing job:", error);
      addToast({
        type: "error",
        title: "Erro ao publicar vaga",
        description: "Tente novamente mais tarde",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl"
    >
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Publicar Nova Vaga
        </h1>
        <p className="text-gray-600">
          Preencha os detalhes da vaga para atrair os melhores candidatos
        </p>
      </motion.div>

      <motion.form
        variants={fadeInUp}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-8"
      >
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-600" />
            Informações Básicas
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título da Vaga *
              </label>
              <Input
                type="text"
                placeholder="Ex: Desenvolvedor Full Stack Sênior"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição da Vaga *
              </label>
              <textarea
                className="flex min-h-[150px] w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white"
                placeholder="Descreva as responsabilidades e o dia a dia da posição..."
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requisitos *
              </label>
              <textarea
                className="flex min-h-[120px] w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white"
                placeholder="Liste os requisitos necessários para a vaga..."
                value={formData.requisitos}
                onChange={(e) =>
                  setFormData({ ...formData, requisitos: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefícios
              </label>
              <textarea
                className="flex min-h-[100px] w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white"
                placeholder="Vale refeição, plano de saúde, home office..."
                value={formData.beneficios}
                onChange={(e) =>
                  setFormData({ ...formData, beneficios: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-600" />
            Detalhes da Vaga
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Contrato *
              </label>
              <select
                className="flex h-11 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white"
                value={formData.tipo_contrato}
                onChange={(e) =>
                  setFormData({ ...formData, tipo_contrato: e.target.value })
                }
                required
              >
                <option value="clt">CLT</option>
                <option value="pj">PJ</option>
                <option value="estagio">Estágio</option>
                <option value="temporario">Temporário</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo de Trabalho *
              </label>
              <select
                className="flex h-11 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white"
                value={formData.modelo_trabalho}
                onChange={(e) =>
                  setFormData({ ...formData, modelo_trabalho: e.target.value })
                }
                required
              >
                <option value="remoto">Remoto</option>
                <option value="presencial">Presencial</option>
                <option value="hibrido">Híbrido</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nível *
              </label>
              <select
                className="flex h-11 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white"
                value={formData.nivel}
                onChange={(e) =>
                  setFormData({ ...formData, nivel: e.target.value })
                }
                required
              >
                <option value="estagio">Estágio</option>
                <option value="junior">Júnior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Sênior</option>
                <option value="especialista">Especialista</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Área *
              </label>
              <Input
                type="text"
                placeholder="Ex: Tecnologia, Marketing, Vendas"
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                required
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
                Cidade *
              </label>
              <Input
                type="text"
                placeholder="São Paulo"
                value={formData.cidade}
                onChange={(e) =>
                  setFormData({ ...formData, cidade: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado *
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
                required
              />
            </div>
          </div>
        </div>

        {/* Salary */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-purple-600" />
            Remuneração
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salário Mínimo (R$)
                </label>
                <Input
                  type="number"
                  placeholder="5000"
                  value={formData.salario_min}
                  onChange={(e) =>
                    setFormData({ ...formData, salario_min: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salário Máximo (R$)
                </label>
                <Input
                  type="number"
                  placeholder="8000"
                  value={formData.salario_max}
                  onChange={(e) =>
                    setFormData({ ...formData, salario_max: e.target.value })
                  }
                />
              </div>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                checked={formData.mostra_salario}
                onChange={(e) =>
                  setFormData({ ...formData, mostra_salario: e.target.checked })
                }
              />
              <span className="text-sm text-gray-700">
                Mostrar faixa salarial publicamente
              </span>
            </label>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills Requeridas (separadas por vírgula)
          </label>
          <Input
            type="text"
            placeholder="React, TypeScript, Node.js, PostgreSQL"
            value={formData.skills_requeridas}
            onChange={(e) =>
              setFormData({ ...formData, skills_requeridas: e.target.value })
            }
          />
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
                Publicando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Publicar Vaga
              </>
            )}
          </Button>
        </div>
      </motion.form>
    </motion.div>
  );
}
