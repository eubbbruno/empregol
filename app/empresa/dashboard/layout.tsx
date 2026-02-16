"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  PlusCircle,
  BarChart3,
  TrendingUp,
  Building2,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  Mail,
  Menu,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/toast";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";

const navItems = [
  {
    section: "GESTÃO",
    items: [
      { href: "/empresa/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/empresa/vagas", label: "Minhas Vagas", icon: Briefcase },
      { href: "/empresa/candidatos", label: "Candidatos", icon: Users },
      { href: "/empresa/entrevistas", label: "Entrevistas", icon: Calendar },
    ],
  },
  {
    section: "PUBLICAR",
    items: [
      {
        href: "/empresa/publicar-vaga",
        label: "Nova Vaga",
        icon: PlusCircle,
        highlight: true as const,
      },
    ],
  },
  {
    section: "ANALYTICS",
    items: [
      { href: "/empresa/relatorios", label: "Relatórios", icon: BarChart3 },
      { href: "/empresa/metricas", label: "Métricas", icon: TrendingUp },
    ],
  },
  {
    section: "CONTA",
    items: [
      { href: "/empresa/perfil", label: "Perfil da Empresa", icon: Building2 },
      { href: "/empresa/plano", label: "Plano & Faturamento", icon: CreditCard },
      { href: "/empresa/configuracoes", label: "Configurações", icon: Settings },
    ],
  },
];

export default function EmpresaDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { addToast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [empresaNome] = useState("Empresa");

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      addToast({
        type: "success",
        title: "Logout realizado",
        description: "Até logo!",
      });
      router.push("/");
    } catch {
      addToast({
        type: "error",
        title: "Erro ao fazer logout",
        description: "Tente novamente",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F1F5]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
                  <Image
                    src="/logo-empreGol.svg"
                    alt="EmpreGol"
                    width={160}
                    height={48}
                    className="h-10 w-auto"
                  />
        <div className="w-10" />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || true) && (
          <motion.aside
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ type: "spring", damping: 20 }}
            className={cn(
              "fixed top-0 left-0 bottom-0 w-60 bg-white z-40 flex flex-col",
              "lg:translate-x-0 shadow-sm",
              !isSidebarOpen && "lg:block hidden"
            )}
          >
            {/* Logo */}
                <div className="p-6 border-b border-gray-100">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/logo-empreGol.svg"
                      alt="EmpreGol"
                      width={160}
                      height={48}
                      className="h-10 w-auto"
                    />
                  </Link>
                </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
              {navItems.map((section) => (
                <div key={section.section}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                    {section.section}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item: any) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsSidebarOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                            item.highlight
                              ? "bg-blue-500 text-white font-semibold hover:bg-blue-600 shadow-md"
                              : isActive
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="flex-1">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-100 space-y-1">
              <Link
                href="/ajuda"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Ajuda</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:pl-60">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar candidatos, vagas..."
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-6">
              {/* Messages */}
              <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-200" />

              {/* User Menu */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center gap-3 hover:bg-gray-50 rounded-xl px-3 py-2 transition-colors">
                    <Avatar.Root className="w-9 h-9">
                      <Avatar.Fallback className="w-full h-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center rounded-full">
                        {empresaNome.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                      {empresaNome}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[200px] bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50"
                    sideOffset={5}
                  >
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/empresa/perfil"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer outline-none"
                      >
                        <Building2 className="w-4 h-4" />
                        Ver Perfil
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/empresa/configuracoes"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer outline-none"
                      >
                        <Settings className="w-4 h-4" />
                        Configurações
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="h-px bg-gray-200 my-2" />
                    <DropdownMenu.Item
                      onSelect={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer outline-none"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
