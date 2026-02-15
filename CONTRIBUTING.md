# 🤝 Guia de Contribuição - EmpreGol

Obrigado por considerar contribuir com o EmpreGol! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

1. [Código de Conduta](#código-de-conduta)
2. [Como Contribuir](#como-contribuir)
3. [Padrões de Código](#padrões-de-código)
4. [Processo de Pull Request](#processo-de-pull-request)
5. [Reportar Bugs](#reportar-bugs)
6. [Sugerir Features](#sugerir-features)

## 🤝 Código de Conduta

### Nossos Compromissos

- Ser respeitoso e inclusivo
- Aceitar críticas construtivas
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros

### Comportamentos Inaceitáveis

- Linguagem ou imagens sexualizadas
- Trolling, insultos ou comentários depreciativos
- Assédio público ou privado
- Publicar informações privadas de outros

## 🚀 Como Contribuir

### 1. Fork & Clone

```bash
# Fork o repositório no GitHub
# Depois clone seu fork

git clone https://github.com/seu-usuario/empregol.git
cd empregol
```

### 2. Configurar Ambiente

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env.local

# Rodar em desenvolvimento
npm run dev
```

### 3. Criar Branch

```bash
# Sempre crie uma nova branch para suas mudanças
git checkout -b feature/sua-feature

# Ou para correções
git checkout -b fix/seu-fix
```

### 4. Fazer Mudanças

- Escreva código limpo e bem documentado
- Siga os padrões de código do projeto
- Adicione testes quando apropriado
- Atualize a documentação se necessário

### 5. Commit

```bash
# Use commits convencionais
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

### 6. Push & Pull Request

```bash
# Push para seu fork
git push origin feature/sua-feature

# Abra um Pull Request no GitHub
```

## 📝 Padrões de Código

### TypeScript

```typescript
// ✅ BOM - Sempre tipar
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  // ...
}

// ❌ RUIM - Evitar any
function getUser(id: any): any {
  // ...
}
```

### Componentes React

```tsx
// ✅ BOM - Componente funcional com tipos
interface ButtonProps {
  variant: "default" | "primary";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {children}
    </button>
  );
}

// ❌ RUIM - Sem tipos
export function Button({ variant, children, onClick }) {
  // ...
}
```

### Nomenclatura

```typescript
// Componentes - PascalCase
export function UserProfile() {}

// Funções - camelCase
function getUserData() {}

// Constantes - UPPER_SNAKE_CASE
const API_URL = "https://api.example.com";

// Interfaces/Types - PascalCase
interface UserData {}
type UserRole = "admin" | "user";
```

### Imports

```typescript
// ✅ BOM - Ordem organizada
// 1. React/Next
import { useState } from "react";
import Link from "next/link";

// 2. Bibliotecas externas
import { motion } from "framer-motion";

// 3. Componentes internos
import { Button } from "@/components/ui/button";

// 4. Utils/Libs
import { cn } from "@/lib/utils";

// 5. Types
import type { User } from "@/types";

// 6. Estilos (se necessário)
import "./styles.css";
```

### Estilos (Tailwind)

```tsx
// ✅ BOM - Classes organizadas e legíveis
<div className={cn(
  // Layout
  "flex items-center justify-between",
  // Spacing
  "p-6 gap-4",
  // Visual
  "glass rounded-2xl border border-[var(--glass-border)]",
  // States
  "hover:border-[var(--glass-border-hover)] transition-all",
  // Conditional
  isActive && "border-primary-500"
)} />

// ❌ RUIM - Classes desorganizadas
<div className="flex glass p-6 items-center border rounded-2xl gap-4 justify-between hover:border-[var(--glass-border-hover)] border-[var(--glass-border)] transition-all" />
```

### Animações

```tsx
// ✅ BOM - Usar variants reutilizáveis
import { fadeInUp } from "@/lib/animations";

<motion.div variants={fadeInUp}>
  Content
</motion.div>

// ❌ RUIM - Animações inline repetidas
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  Content
</motion.div>
```

## 🔄 Processo de Pull Request

### Checklist Antes de Abrir PR

- [ ] Código segue os padrões do projeto
- [ ] Todos os testes passam (`npm run lint`)
- [ ] Sem erros de TypeScript (`npx tsc --noEmit`)
- [ ] Documentação atualizada (se necessário)
- [ ] Commits seguem o padrão convencional
- [ ] Branch está atualizada com `main`

### Template de Pull Request

```markdown
## Descrição

Breve descrição das mudanças.

## Tipo de Mudança

- [ ] Bug fix (correção que resolve um issue)
- [ ] Nova feature (adiciona funcionalidade)
- [ ] Breaking change (mudança que quebra compatibilidade)
- [ ] Documentação

## Como Testar

1. Passo 1
2. Passo 2
3. Passo 3

## Screenshots (se aplicável)

Adicione screenshots das mudanças visuais.

## Checklist

- [ ] Código segue os padrões do projeto
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Sem conflitos com main
```

### Processo de Review

1. **Automated Checks**: CI/CD roda automaticamente
2. **Code Review**: Mantenedores revisam o código
3. **Feedback**: Responda aos comentários e faça ajustes
4. **Approval**: PR é aprovado por pelo menos 1 mantenedor
5. **Merge**: PR é mergeado na branch main

## 🐛 Reportar Bugs

### Antes de Reportar

1. Verifique se o bug já foi reportado
2. Teste na última versão
3. Colete informações sobre o bug

### Template de Bug Report

```markdown
## Descrição do Bug

Descrição clara e concisa do bug.

## Passos para Reproduzir

1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## Comportamento Esperado

O que deveria acontecer.

## Comportamento Atual

O que está acontecendo.

## Screenshots

Se aplicável, adicione screenshots.

## Ambiente

- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Node Version: [e.g. 18.17.0]
- Next.js Version: [e.g. 15.1.6]

## Informações Adicionais

Qualquer outra informação relevante.
```

## 💡 Sugerir Features

### Template de Feature Request

```markdown
## Problema que Resolve

Descrição clara do problema que esta feature resolve.

## Solução Proposta

Descrição da solução que você gostaria de ver.

## Alternativas Consideradas

Outras soluções que você considerou.

## Informações Adicionais

Contexto adicional, mockups, exemplos, etc.
```

## 🎨 Diretrizes de Design

### Visual Identity

- **Dark Mode Premium**: Sempre priorize dark mode
- **Glass Morphism**: Use em todos os cards
- **Gradientes**: Textos e botões importantes
- **Glow Effects**: Elementos interativos
- **Animações**: Suaves e performáticas

### Cores

```css
/* Use as variáveis CSS definidas */
var(--primary-500)    /* Roxo - Marca */
var(--secondary-500)  /* Ciano - Destaque */
var(--accent-hot)     /* Laranja - CTA */
var(--success-500)    /* Verde - Sucesso */
```

### Espaçamento

```tsx
// Siga o sistema de espaçamento do Tailwind
gap-2   // 8px
gap-4   // 16px
gap-6   // 24px
gap-8   // 32px

p-4     // 16px padding
p-6     // 24px padding
p-8     // 32px padding
```

### Responsividade

```tsx
// Mobile-first approach
<div className="
  grid
  grid-cols-1          // Mobile
  md:grid-cols-2       // Tablet
  lg:grid-cols-3       // Desktop
  gap-6
">
```

## 🧪 Testes (Quando Implementados)

### Estrutura de Testes

```typescript
// component.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText("Click me").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 📚 Recursos Úteis

### Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

### Ferramentas

- [VS Code](https://code.visualstudio.com/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [React DevTools](https://react.dev/learn/react-developer-tools)

## 🎯 Áreas que Precisam de Ajuda

### Alta Prioridade

- [ ] Testes unitários e E2E
- [ ] Acessibilidade (ARIA, keyboard nav)
- [ ] Internacionalização (i18n)
- [ ] Performance optimization

### Média Prioridade

- [ ] Documentação de componentes
- [ ] Storybook setup
- [ ] CI/CD pipeline
- [ ] Error boundaries

### Baixa Prioridade

- [ ] Animações adicionais
- [ ] Temas alternativos
- [ ] Easter eggs
- [ ] Gamificação

## 💬 Comunicação

### Onde Pedir Ajuda

- **GitHub Issues**: Para bugs e features
- **GitHub Discussions**: Para perguntas gerais
- **Discord** (se houver): Para chat em tempo real

### Tempo de Resposta

- Issues: 1-3 dias úteis
- Pull Requests: 2-5 dias úteis
- Perguntas: 1-2 dias úteis

## 🏆 Reconhecimento

Todos os contribuidores serão:

- Listados no README.md
- Mencionados nos release notes
- Adicionados ao hall da fama (quando implementado)

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

---

**Obrigado por contribuir com o EmpreGol! 💜**

Juntos, vamos construir a melhor plataforma de empregos do Brasil! 🚀
