# 📝 Snippets Úteis - EmpreGol

Coleção de snippets reutilizáveis para acelerar o desenvolvimento.

## 🎨 Componentes

### Glass Card Básico

```tsx
<div className="glass rounded-2xl p-6 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all">
  {/* Conteúdo */}
</div>
```

### Card com Animação

```tsx
import { motion } from "framer-motion";
import { cardHover } from "@/lib/animations";

<motion.div
  variants={cardHover}
  initial="rest"
  whileHover="hover"
  className="glass rounded-2xl p-6 border border-[var(--glass-border)]"
>
  {/* Conteúdo */}
</motion.div>
```

### Seção com Stagger

```tsx
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

<motion.section
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="py-32"
>
  <motion.h2 variants={fadeInUp}>
    Título
  </motion.h2>
  <motion.p variants={fadeInUp}>
    Descrição
  </motion.p>
</motion.section>
```

### Gradient Text

```tsx
<h1 className="text-5xl font-bold">
  <span className="gradient-text-primary">Destaque</span>{" "}
  <span className="text-[var(--text-primary)]">Normal</span>
</h1>
```

### Badge com Glow

```tsx
<div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border border-[var(--glass-border)]">
  <div className="w-2 h-2 rounded-full bg-[var(--success-500)] animate-pulse" />
  <span className="text-sm text-[var(--text-secondary)]">Status</span>
</div>
```

## 🎬 Animações

### Fade In ao Scroll

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {/* Conteúdo */}
</motion.div>
```

### Hover com Scale

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Clique Aqui
</motion.button>
```

### Contador Animado

```tsx
import { useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString("pt-BR");
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}
```

### Partículas Flutuantes

```tsx
{[...Array(20)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute w-1 h-1 bg-[var(--primary-500)] rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay: Math.random() * 2,
    }}
  />
))}
```

## 🎯 Formulários

### Input com Ícone

```tsx
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

<div className="relative">
  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
  <Input
    type="email"
    placeholder="seu@email.com"
    className="pl-12"
  />
</div>
```

### Form com Validação (React Hook Form + Zod)

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <Input {...register("password")} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <Button type="submit">Entrar</Button>
    </form>
  );
}
```

## 🎨 Efeitos Visuais

### Glow Orb Animado

```tsx
<motion.div
  className="absolute w-96 h-96 rounded-full bg-[var(--primary-700)] opacity-20 blur-[120px]"
  animate={{
    scale: [1, 1.2, 1],
    x: [0, 50, 0],
    y: [0, -50, 0],
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```

### Gradient Border Animado

```tsx
<div className="relative p-[2px] rounded-2xl overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-hot)] animate-gradient-shift" />
  <div className="relative glass rounded-2xl p-6">
    {/* Conteúdo */}
  </div>
</div>
```

### Shimmer Effect

```tsx
<div className="relative overflow-hidden">
  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  {/* Conteúdo */}
</div>
```

## 🔧 Utilitários

### Debounce Hook

```tsx
import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Uso
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 500);

useEffect(() => {
  // Fazer busca com debouncedSearch
}, [debouncedSearch]);
```

### Copy to Clipboard

```tsx
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // Mostrar toast de sucesso
  } catch (err) {
    console.error("Erro ao copiar:", err);
  }
};
```

### Format Currency

```tsx
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Uso: formatCurrency(12000) => "R$ 12.000"
```

### Time Ago

```tsx
const getTimeAgo = (date: string) => {
  const now = new Date();
  const posted = new Date(date);
  const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "Agora mesmo";
  if (diffInHours < 24) return `Há ${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `Há ${diffInDays}d`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `Há ${diffInWeeks}sem`;
};
```

## 🎭 Loading States

### Skeleton Loader

```tsx
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-[var(--glass-bg)] rounded w-3/4" />
  <div className="h-4 bg-[var(--glass-bg)] rounded w-1/2" />
  <div className="h-4 bg-[var(--glass-bg)] rounded w-5/6" />
</div>
```

### Spinner

```tsx
<div className="w-8 h-8 border-4 border-[var(--glass-border)] border-t-[var(--primary-500)] rounded-full animate-spin" />
```

### Loading Card

```tsx
<div className="glass rounded-2xl p-6 border border-[var(--glass-border)]">
  <div className="animate-pulse space-y-4">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl bg-[var(--glass-bg)]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-[var(--glass-bg)] rounded w-3/4" />
        <div className="h-3 bg-[var(--glass-bg)] rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-[var(--glass-bg)] rounded" />
      <div className="h-3 bg-[var(--glass-bg)] rounded w-5/6" />
    </div>
  </div>
</div>
```

## 🚨 Toast Notifications

```tsx
// Usando react-hot-toast ou similar
import toast from "react-hot-toast";

// Success
toast.success("Candidatura enviada!", {
  style: {
    background: "var(--glass-bg)",
    color: "var(--text-primary)",
    border: "1px solid var(--success-500)",
  },
});

// Error
toast.error("Algo deu errado", {
  style: {
    background: "var(--glass-bg)",
    color: "var(--text-primary)",
    border: "1px solid var(--danger-500)",
  },
});
```

## 📱 Responsive Patterns

### Mobile Menu

```tsx
const [isOpen, setIsOpen] = useState(false);

// Mobile button
<button
  className="lg:hidden"
  onClick={() => setIsOpen(!isOpen)}
>
  {isOpen ? <X /> : <Menu />}
</button>

// Mobile menu
{isOpen && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="lg:hidden glass rounded-2xl p-6"
  >
    {/* Menu items */}
  </motion.div>
)}
```

### Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

---

**Dica:** Salve esses snippets no seu editor para acesso rápido!
