"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  User,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Briefcase, label: "Vagas", href: "/dashboard/vagas" },
  { icon: FileText, label: "Candidaturas", href: "/dashboard/candidaturas" },
  { icon: MessageSquare, label: "Mensagens", href: "/dashboard/mensagens" },
  { icon: User, label: "Perfil", href: "/dashboard/perfil" },
  { icon: Settings, label: "Configurações", href: "/dashboard/configuracoes" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 rounded-xl glass border border-[var(--glass-border)] flex items-center justify-center"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-[var(--text-primary)]" />
        ) : (
          <Menu className="w-6 h-6 text-[var(--text-primary)]" />
        )}
      </button>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 glass border-r border-[var(--glass-border)] z-40 transition-transform lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        initial={false}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
              <span className="text-2xl">⚡</span>
            </div>
            <span className="text-xl font-bold gradient-text-primary">
              EmpreGol
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                      isActive
                        ? "bg-gradient-primary text-white glow-primary"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]"
                    )}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="pt-6 border-t border-[var(--glass-border)]">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-[var(--glass-border)] mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                JS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                  João Silva
                </p>
                <p className="text-xs text-[var(--text-muted)] truncate">
                  Desenvolvedor
                </p>
              </div>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:text-[var(--danger-500)] hover:bg-[var(--glass-bg)] transition-all">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 glass border-b border-[var(--glass-border)] backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Buscar vagas, empresas..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-[var(--glass-border)] bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[var(--primary-glow)] outline-none transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-6">
              <button className="relative w-12 h-12 rounded-xl glass border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] flex items-center justify-center transition-all">
                <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--danger-500)] animate-pulse" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
