"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Briefcase, Building2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/vagas", label: "Vagas", icon: Briefcase },
  { href: "/cadastro", label: "Para Empresas", icon: Building2 },
  { href: "/#pricing", label: "Preços", icon: DollarSign },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "py-3" : "py-6"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className={cn(
              "rounded-2xl border transition-all duration-300",
              isScrolled
                ? "bg-white/95 backdrop-blur-xl border-gray-200 shadow-lg"
                : "bg-white/80 backdrop-blur-sm border-gray-200"
            )}
          >
            <div className="flex items-center justify-between px-6 py-4">
              {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-empreGol.svg"
              alt="EmpreGol"
              width={180}
              height={56}
              className="h-10 lg:h-12 w-auto"
              priority
            />
          </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="font-medium">{link.label}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/login">
                  <Button variant="secondary" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-cta hover:opacity-90 text-white shadow-md"
                  >
                    Cadastrar
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-900" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-900" />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
        }}
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <motion.div
          className="absolute top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -20,
          }}
        >
          <div className="p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-100 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <link.icon className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">
                    {link.label}
                  </span>
                </motion.div>
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="secondary" size="lg" className="w-full">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-gradient-cta hover:opacity-90 text-white shadow-md"
                >
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
