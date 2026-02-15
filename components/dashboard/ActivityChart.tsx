"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fadeInUp } from "@/lib/animations";

const data = [
  { name: "Seg", visualizacoes: 12, candidaturas: 2 },
  { name: "Ter", visualizacoes: 19, candidaturas: 4 },
  { name: "Qua", visualizacoes: 15, candidaturas: 3 },
  { name: "Qui", visualizacoes: 25, candidaturas: 5 },
  { name: "Sex", visualizacoes: 22, candidaturas: 4 },
  { name: "Sáb", visualizacoes: 8, candidaturas: 1 },
  { name: "Dom", visualizacoes: 5, candidaturas: 0 },
];

export function ActivityChart() {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">
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
              stroke="#9CA3AF"
              style={{ fontSize: "12px" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              style={{ fontSize: "12px" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{ color: "#111827", fontWeight: "600" }}
              itemStyle={{ color: "#4B5563" }}
            />
            <Area
              type="monotone"
              dataKey="visualizacoes"
              stroke="#8B5CF6"
              strokeWidth={2}
              fill="url(#colorVisualizacoes)"
            />
            <Area
              type="monotone"
              dataKey="candidaturas"
              stroke="#06B6D4"
              strokeWidth={2}
              fill="url(#colorCandidaturas)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-600" />
          <span className="text-sm text-gray-600">Visualizações</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-600" />
          <span className="text-sm text-gray-600">Candidaturas</span>
        </div>
      </div>
    </motion.div>
  );
}
