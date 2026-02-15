"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fadeInUp } from "@/lib/animations";

const data = [
  { name: "Seg", visualizacoes: 12, candidaturas: 3 },
  { name: "Ter", visualizacoes: 19, candidaturas: 5 },
  { name: "Qua", visualizacoes: 15, candidaturas: 4 },
  { name: "Qui", visualizacoes: 25, candidaturas: 7 },
  { name: "Sex", visualizacoes: 22, candidaturas: 6 },
  { name: "Sáb", visualizacoes: 8, candidaturas: 2 },
  { name: "Dom", visualizacoes: 5, candidaturas: 1 },
];

export function ActivityChart() {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass rounded-2xl p-6 border border-[var(--glass-border)]"
    >
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
        Atividade da Semana
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVisualizacoes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCandidaturas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="var(--text-muted)"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="var(--text-muted)" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
              }}
              labelStyle={{ color: "var(--text-primary)" }}
              itemStyle={{ color: "var(--text-secondary)" }}
            />
            <Area
              type="monotone"
              dataKey="visualizacoes"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVisualizacoes)"
            />
            <Area
              type="monotone"
              dataKey="candidaturas"
              stroke="#06B6D4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCandidaturas)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--primary-500)]" />
          <span className="text-sm text-[var(--text-secondary)]">Visualizações</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--secondary-500)]" />
          <span className="text-sm text-[var(--text-secondary)]">Candidaturas</span>
        </div>
      </div>
    </motion.div>
  );
}
