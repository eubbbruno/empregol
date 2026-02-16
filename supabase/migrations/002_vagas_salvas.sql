-- Migration: Create vagas_salvas table for saved jobs feature
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.vagas_salvas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidato_id UUID NOT NULL REFERENCES public.candidatos(id) ON DELETE CASCADE,
  vaga_id UUID NOT NULL REFERENCES public.vagas(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(candidato_id, vaga_id)
);

-- Enable RLS
ALTER TABLE public.vagas_salvas ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Candidatos podem ver suas vagas salvas"
  ON public.vagas_salvas FOR SELECT
  USING (candidato_id IN (SELECT id FROM public.candidatos WHERE id = auth.uid()));

CREATE POLICY "Candidatos podem salvar vagas"
  ON public.vagas_salvas FOR INSERT
  WITH CHECK (candidato_id IN (SELECT id FROM public.candidatos WHERE id = auth.uid()));

CREATE POLICY "Candidatos podem remover vagas salvas"
  ON public.vagas_salvas FOR DELETE
  USING (candidato_id IN (SELECT id FROM public.candidatos WHERE id = auth.uid()));

-- Index for performance
CREATE INDEX idx_vagas_salvas_candidato ON public.vagas_salvas(candidato_id);
CREATE INDEX idx_vagas_salvas_vaga ON public.vagas_salvas(vaga_id);
