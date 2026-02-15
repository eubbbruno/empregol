# 🚀 Guia de Desenvolvimento - EmpreGol

## 📋 Índice

1. [Setup Inicial](#setup-inicial)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Design System](#design-system)
4. [Componentes](#componentes)
5. [Animações](#animações)
6. [Boas Práticas](#boas-práticas)
7. [Próximos Passos](#próximos-passos)

## 🔧 Setup Inicial

### Requisitos

- Node.js 18+
- npm ou yarn
- Git

### Instalação

```bash
# Clonar o repositório
git clone [url-do-repo]
cd empregol

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env.local

# Rodar em desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## 📁 Estrutura do Projeto

```
empregol/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raiz com fonts e metadata
│   ├── page.tsx                 # Landing page (home)
│   ├── globals.css              # Estilos globais + Design System
│   ├── login/                   # Página de login
│   ├── cadastro/                # Página de cadastro
│   └── vagas/                   # Listagem de vagas
│
├── components/
│   ├── ui/                      # Componentes base do shadcn/ui
│   │   ├── button.tsx          # Botão com variantes e animações
│   │   └── input.tsx           # Input com glass effect
│   │
│   ├── layout/                  # Componentes de layout
│   │   ├── Navbar.tsx          # Navbar flutuante com glass
│   │   ├── Footer.tsx          # Footer com links e newsletter
│   │   └── PageTransition.tsx  # Wrapper de transições
│   │
│   ├── sections/                # Seções da landing page
│   │   ├── Hero.tsx            # Hero com busca e badges
│   │   ├── Metrics.tsx         # Números animados
│   │   ├── HowItWorks.tsx      # 3 passos
│   │   ├── Features.tsx        # Bento grid de features
│   │   ├── Pricing.tsx         # Planos para empresas
│   │   └── FinalCTA.tsx        # CTA final
│   │
│   └── cards/                   # Cards reutilizáveis
│       └── VagaCard.tsx        # Card de vaga
│
├── lib/
│   ├── utils.ts                # Utilitários (cn helper)
│   └── animations.ts           # Variants do Framer Motion
│
└── public/                      # Assets estáticos
```

## 🎨 Design System

### Paleta de Cores

Todas as cores estão definidas em `app/globals.css` como CSS variables:

```css
/* Backgrounds */
--bg-primary: #09090B        /* Background principal */
--bg-secondary: #0F0F14      /* Background secundário */
--bg-tertiary: #18181B       /* Background terciário */

/* Glass */
--glass-bg: rgba(255, 255, 255, 0.04)
--glass-border: rgba(255, 255, 255, 0.08)

/* Primary - Roxo (marca) */
--primary-500: #8B5CF6
--primary-600: #7C3AED
--primary-700: #6D28D9

/* Secondary - Ciano */
--secondary-500: #06B6D4

/* Accent - Laranja/Dourado (CTAs) */
--accent-hot: #F97316
--accent-gold: #FACC15

/* Success - Verde */
--success-500: #10B981
```

### Classes Utilitárias

```css
/* Glass morphism */
.glass                    /* Background glass com blur */
.glass-hover             /* Hover effect para glass */

/* Gradientes de texto */
.gradient-text-primary   /* Gradiente roxo */
.gradient-text-cta       /* Gradiente laranja/dourado */
.gradient-text-success   /* Gradiente verde */

/* Glow effects */
.glow-primary           /* Sombra luminosa roxa */
.glow-secondary         /* Sombra luminosa ciano */
.glow-cta               /* Sombra luminosa laranja */

/* Backgrounds gradiente */
.bg-gradient-primary    /* Background gradiente roxo */
.bg-gradient-cta        /* Background gradiente CTA */
```

### Tipografia

- **Display/Hero**: Inter Bold (48-72px)
- **Headings**: Inter SemiBold (24-40px)
- **Body**: Inter Regular (14-18px)
- **Small**: Inter Medium (12-14px)

## 🧩 Componentes

### Button

Localização: `components/ui/button.tsx`

**Variantes:**
- `default`: Gradiente laranja/dourado com glow
- `primary`: Gradiente roxo com glow
- `secondary`: Glass com hover
- `ghost`: Transparente
- `outline`: Borda glass
- `destructive`: Vermelho
- `link`: Texto com underline

**Tamanhos:**
- `sm`: 36px altura
- `default`: 44px altura
- `lg`: 56px altura
- `xl`: 64px altura
- `icon`: 40x40px

**Uso:**

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">
  Começar Grátis
</Button>
```

### Input

Localização: `components/ui/input.tsx`

**Features:**
- Glass effect com blur
- Border animado no focus
- Glow ring no focus
- Placeholder estilizado

**Uso:**

```tsx
import { Input } from "@/components/ui/input";

<Input 
  type="email" 
  placeholder="seu@email.com"
  className="pl-12" // Para ícones
/>
```

### VagaCard

Localização: `components/cards/VagaCard.tsx`

**Props:**
- `id`: ID da vaga
- `titulo`: Título da vaga
- `empresa`: Nome da empresa
- `localizacao`: Cidade/Estado
- `tipo`: CLT | PJ | Estágio | Freelance
- `nivel`: Júnior | Pleno | Sênior | Especialista
- `salario`: { min, max }
- `remoto`: boolean
- `tags`: string[]
- `matchScore`: número 0-100 (opcional)
- `verificada`: boolean (opcional)

## 🎬 Animações

Todas as animações usam Framer Motion. Variants reutilizáveis em `lib/animations.ts`:

### Variants Disponíveis

```typescript
// Fade
fadeIn              // Fade simples
fadeInUp           // Fade + slide de baixo
fadeInDown         // Fade + slide de cima
fadeInLeft         // Fade + slide da esquerda
fadeInRight        // Fade + slide da direita

// Scale
scaleIn            // Scale de 0.9 para 1
scaleInBounce      // Scale com bounce

// Stagger
staggerContainer        // Container com delay entre filhos
staggerContainerFast    // Stagger rápido (0.05s)
staggerContainerSlow    // Stagger lento (0.2s)

// Hover
cardHover          // Hover para cards (scale 1.02)
buttonHover        // Hover para botões (scale 1.03)

// Outros
blurFadeIn         // Fade + blur
rotateIn           // Rotate + fade
pageTransition     // Transição de página
```

### Uso Básico

```tsx
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <motion.h1 variants={fadeInUp}>
    Título Animado
  </motion.h1>
  <motion.p variants={fadeInUp}>
    Parágrafo animado
  </motion.p>
</motion.div>
```

### Números Animados

```tsx
import { useMotionValue, useSpring } from "framer-motion";

// Ver implementação completa em components/sections/Metrics.tsx
```

## ✅ Boas Práticas

### TypeScript

```typescript
// ✅ BOM - Sempre tipar
interface ButtonProps {
  variant: "default" | "primary";
  children: React.ReactNode;
}

// ❌ RUIM - Evitar any
function doSomething(data: any) { }
```

### Server vs Client Components

```tsx
// ✅ BOM - Server component por padrão
export default function Page() {
  return <div>...</div>
}

// ✅ BOM - Client component quando necessário
"use client";
import { useState } from "react";

export default function InteractivePage() {
  const [state, setState] = useState(false);
  return <div>...</div>
}
```

### Componentes

```tsx
// ✅ BOM - Componentes pequenos e focados
export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>
}

// ❌ RUIM - Componentes muito grandes (>150 linhas)
```

### Estilos

```tsx
// ✅ BOM - Tailwind inline + cn helper
import { cn } from "@/lib/utils";

<div className={cn(
  "glass rounded-2xl p-6",
  isActive && "border-primary-500"
)} />

// ❌ RUIM - CSS modules ou styled-components
```

### Animações

```tsx
// ✅ BOM - Usar variants reutilizáveis
<motion.div variants={fadeInUp} />

// ❌ RUIM - Animações inline repetidas
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

## 🎯 Próximos Passos

### Fase 1 - Completar Landing Page ✅

- [x] Hero Section
- [x] Metrics
- [x] How It Works
- [x] Features
- [x] Pricing
- [x] Final CTA
- [x] Footer

### Fase 2 - Autenticação ✅

- [x] Página de Login
- [x] Página de Cadastro
- [ ] Integração com NextAuth
- [ ] OAuth (Google, GitHub)
- [ ] Recuperação de senha

### Fase 3 - Vagas ⏳

- [x] Listagem de vagas
- [x] Card de vaga
- [ ] Página de detalhes da vaga
- [ ] Filtros avançados
- [ ] Busca com debounce
- [ ] Paginação

### Fase 4 - Dashboard Candidato

- [ ] Layout do dashboard
- [ ] Perfil do candidato
- [ ] Candidaturas ativas
- [ ] Vagas recomendadas
- [ ] Tracker de candidaturas
- [ ] Notificações

### Fase 5 - Dashboard Empresa

- [ ] Layout do dashboard
- [ ] Publicar vaga
- [ ] Gerenciar vagas
- [ ] Ver candidatos
- [ ] Pipeline de recrutamento
- [ ] Analytics

### Fase 6 - Features Avançadas

- [ ] Match com IA
- [ ] Alertas personalizados
- [ ] Chat em tempo real
- [ ] Sistema de notificações
- [ ] Upload de currículo
- [ ] Otimização de currículo com IA

### Fase 7 - Backend & API

- [ ] Setup Supabase/Prisma
- [ ] API Routes
- [ ] Autenticação JWT
- [ ] CRUD de vagas
- [ ] CRUD de candidaturas
- [ ] Sistema de match
- [ ] Upload de arquivos

### Fase 8 - Polish & Deploy

- [ ] Testes E2E
- [ ] Otimização de performance
- [ ] SEO
- [ ] Analytics
- [ ] Deploy Vercel
- [ ] CI/CD

## 🐛 Debugging

### Verificar erros de build

```bash
npm run build
```

### Verificar linting

```bash
npm run lint
```

### Limpar cache do Next.js

```bash
rm -rf .next
npm run dev
```

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

**Dúvidas?** Consulte a documentação ou abra uma issue no repositório.
