# ⚡ EmpreGol

> **Seu Próximo Gol Profissional Começa Aqui**

Uma plataforma SaaS brasileira de empregos que conecta empresas e profissionais em transição de carreira. Zero burocracia, UX absurdamente boa, e visual premium dark mode.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=flat-square)

## 🎨 Stack Tecnológica

- **Framework**: Next.js 14+ (App Router) com TypeScript
- **Estilização**: Tailwind CSS 4 como base utilitária
- **Animações**: Framer Motion para todas as micro-interações
- **Componentes UI**: 
  - Radix UI (primitivos acessíveis)
  - shadcn/ui (base funcional com override total)
  - Lucide React (ícones)
- **Gráficos**: Recharts
- **State Management**: Zustand
- **Formulários**: React Hook Form + Zod

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
empregol/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout root
│   ├── page.tsx           # Landing page
│   └── globals.css        # Estilos globais + Design System
├── components/
│   ├── ui/                # Componentes base (Button, Input, etc)
│   ├── layout/            # Navbar, Footer, PageTransition
│   ├── sections/          # Seções da landing page
│   ├── cards/             # Card components reutilizáveis
│   ├── forms/             # Formulários
│   └── dashboard/         # Componentes do dashboard
├── lib/
│   ├── utils.ts           # Utilitários (cn, etc)
│   └── animations.ts      # Variants do Framer Motion
└── public/                # Assets estáticos
```

## 🎨 Design System

### Paleta de Cores

```css
/* Backgrounds */
--bg-primary: #09090B
--bg-secondary: #0F0F14
--bg-tertiary: #18181B

/* Primary — Roxo */
--primary-500: #8B5CF6
--primary-600: #7C3AED
--primary-700: #6D28D9

/* Secondary — Ciano */
--secondary-500: #06B6D4

/* Accent — Laranja/Dourado */
--accent-hot: #F97316
--accent-gold: #FACC15

/* Success — Verde */
--success-500: #10B981
```

### Princípios de Design

1. **Glass Morphism**: Todos os cards usam `glass` class
2. **Gradientes**: Textos e botões importantes com gradientes vibrantes
3. **Glow Effects**: Elementos interativos com sombras luminosas
4. **Animações**: Framer Motion em todas as interações
5. **Dark Mode Premium**: Visual inspirado em Linear, Raycast, Vercel

## 🧩 Componentes Principais

### Seções da Landing Page

- ✅ **Hero**: Headline + busca de vagas + badges
- ✅ **Metrics**: Números animados com contador
- ✅ **HowItWorks**: 3 passos com cards glass
- ✅ **Features**: Bento grid com recursos
- ✅ **Pricing**: Planos para empresas
- ✅ **FinalCTA**: Call-to-action final com partículas

### Layout

- ✅ **Navbar**: Flutuante com glass effect no scroll
- ✅ **Footer**: Links + newsletter + social
- ✅ **PageTransition**: Transições suaves entre páginas

## 🎯 Próximos Passos

- [ ] Seção de Testimonials com InfiniteMovingCards
- [ ] Seção AI-Powered com demos visuais
- [ ] Marquee com logos de empresas
- [ ] Páginas de autenticação (Login/Cadastro)
- [ ] Dashboard do Candidato
- [ ] Dashboard da Empresa
- [ ] Páginas de Vagas (listagem + detalhe)
- [ ] Integração com backend/API

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento com Turbopack
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linter ESLint
```

## 📝 Convenções de Código

- **TypeScript strict**: Nunca `any`, sempre tipar
- **Server Components**: Por padrão (use `"use client"` quando necessário)
- **Componentes pequenos**: Max 150 linhas
- **Framer Motion**: Todas as animações via Framer Motion
- **Acessibilidade**: Radix primitives, aria labels, keyboard nav

## 🌟 Features Principais

### Para Candidatos
- ✨ Perfil inteligente (preencha uma vez)
- 🤖 Match com IA
- 🔔 Alertas personalizados
- 📊 Tracker de candidaturas
- ⚡ Candidatura em 1 clique

### Para Empresas
- 📝 Publicação rápida de vagas
- 🎯 Filtros inteligentes com IA
- 📈 Dashboard de recrutamento
- 🔍 Busca avançada de candidatos
- 📊 Analytics e relatórios

## 📄 Licença

Este projeto é privado e proprietário.

## 🤝 Contribuindo

Este é um projeto em desenvolvimento ativo. Contribuições são bem-vindas!

---

**Feito com 💜 no Brasil**
