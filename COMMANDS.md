# 🔧 Comandos Úteis - EmpreGol

Referência rápida de comandos para desenvolvimento.

## 📦 NPM Scripts

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento (Turbopack)
npm run dev

# Servidor estará disponível em:
# http://localhost:3000
```

### Build & Produção

```bash
# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Build + Start
npm run build && npm start
```

### Qualidade de Código

```bash
# Rodar linter
npm run lint

# Rodar linter e corrigir automaticamente
npm run lint -- --fix

# Verificar tipos TypeScript
npx tsc --noEmit
```

## 🧹 Limpeza & Manutenção

### Limpar Cache

```bash
# Limpar cache do Next.js
rm -rf .next

# Limpar node_modules e reinstalar
rm -rf node_modules
npm install

# Limpar tudo e começar do zero
rm -rf .next node_modules
npm install
npm run dev
```

### Atualizar Dependências

```bash
# Ver dependências desatualizadas
npm outdated

# Atualizar todas as dependências (cuidado!)
npm update

# Atualizar uma dependência específica
npm install package-name@latest
```

## 🎨 Tailwind CSS

### Gerar Intellisense

```bash
# Gerar arquivo de configuração do Tailwind para autocomplete
npx tailwindcss init -p
```

### Ver Classes Disponíveis

```bash
# Abrir documentação do Tailwind
open https://tailwindcss.com/docs
```

## 🔍 Debug & Análise

### Analisar Bundle

```bash
# Instalar analyzer
npm install -D @next/bundle-analyzer

# Adicionar ao next.config.ts:
# const withBundleAnalyzer = require('@next/bundle-analyzer')({
#   enabled: process.env.ANALYZE === 'true',
# })

# Analisar bundle
ANALYZE=true npm run build
```

### Verificar Performance

```bash
# Build de produção
npm run build

# Ver estatísticas de build
# (Next.js mostra automaticamente após build)
```

### Lighthouse

```bash
# Instalar Lighthouse CLI
npm install -g lighthouse

# Rodar análise
lighthouse http://localhost:3000 --view
```

## 🧪 Testes (quando implementados)

```bash
# Rodar testes unitários
npm test

# Rodar testes em watch mode
npm test -- --watch

# Rodar testes E2E
npm run test:e2e

# Coverage
npm test -- --coverage
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy produção
vercel --prod
```

### Build Local

```bash
# Build otimizado
npm run build

# Testar build localmente
npm start
```

## 📝 Git Workflow

### Commits Convencionais

```bash
# Feature
git commit -m "feat: adiciona dashboard do candidato"

# Fix
git commit -m "fix: corrige bug no filtro de vagas"

# Docs
git commit -m "docs: atualiza README com novos comandos"

# Style
git commit -m "style: ajusta espaçamento do navbar"

# Refactor
git commit -m "refactor: melhora performance do VagaCard"

# Test
git commit -m "test: adiciona testes para Button component"

# Chore
git commit -m "chore: atualiza dependências"
```

### Branches

```bash
# Criar nova feature branch
git checkout -b feature/nome-da-feature

# Criar nova fix branch
git checkout -b fix/nome-do-fix

# Voltar para main
git checkout main

# Merge feature
git merge feature/nome-da-feature

# Deletar branch
git branch -d feature/nome-da-feature
```

## 🔐 Variáveis de Ambiente

### Desenvolvimento

```bash
# Copiar exemplo
cp .env.example .env.local

# Editar variáveis
# Use seu editor preferido para editar .env.local
```

### Produção (Vercel)

```bash
# Adicionar variável via CLI
vercel env add NOME_DA_VARIAVEL

# Listar variáveis
vercel env ls

# Remover variável
vercel env rm NOME_DA_VARIAVEL
```

## 📊 Monitoramento

### Logs de Produção (Vercel)

```bash
# Ver logs em tempo real
vercel logs

# Ver logs de função específica
vercel logs [deployment-url]
```

### Análise de Performance

```bash
# Next.js Analytics (Vercel)
# Adicionar ao next.config.ts:
# experimental: {
#   analytics: true
# }
```

## 🛠️ Utilitários

### Gerar Componente

```bash
# Criar estrutura de componente manualmente
mkdir -p components/nome-do-componente
touch components/nome-do-componente/index.tsx
```

### Formatar Código

```bash
# Instalar Prettier (se não tiver)
npm install -D prettier

# Formatar todos os arquivos
npx prettier --write .

# Formatar arquivo específico
npx prettier --write app/page.tsx
```

### Verificar Acessibilidade

```bash
# Instalar axe-core
npm install -D @axe-core/react

# Usar no desenvolvimento (adicionar ao _app.tsx)
```

## 🔄 Sincronização

### Atualizar do Repositório

```bash
# Pull latest changes
git pull origin main

# Pull e rebase
git pull --rebase origin main

# Fetch sem merge
git fetch origin
```

### Resolver Conflitos

```bash
# Ver arquivos em conflito
git status

# Após resolver conflitos
git add .
git commit -m "resolve: conflitos de merge"
```

## 📱 Mobile Testing

### Testar em Dispositivo Real

```bash
# Descobrir IP local
ipconfig  # Windows
ifconfig  # Mac/Linux

# Acessar de outro dispositivo na mesma rede
# http://[SEU-IP]:3000
```

### Emular Dispositivos

```bash
# Chrome DevTools
# F12 > Toggle Device Toolbar (Ctrl+Shift+M)

# Firefox DevTools
# F12 > Responsive Design Mode (Ctrl+Shift+M)
```

## 🎯 Atalhos Úteis

### VS Code

```
Ctrl+P          - Quick Open
Ctrl+Shift+P    - Command Palette
Ctrl+`          - Toggle Terminal
Ctrl+B          - Toggle Sidebar
Ctrl+/          - Toggle Comment
Alt+Up/Down     - Move Line Up/Down
Shift+Alt+F     - Format Document
F2              - Rename Symbol
```

### Chrome DevTools

```
F12             - Open DevTools
Ctrl+Shift+C    - Inspect Element
Ctrl+Shift+M    - Toggle Device Toolbar
Ctrl+Shift+P    - Command Menu
Ctrl+R          - Reload
Ctrl+Shift+R    - Hard Reload
```

## 🚨 Troubleshooting

### Porta em Uso

```bash
# Windows - Matar processo na porta 3000
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Erro de Módulo Não Encontrado

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro de Build

```bash
# Limpar cache e rebuildar
rm -rf .next
npm run build
```

### TypeScript Errors

```bash
# Verificar tipos
npx tsc --noEmit

# Restart TS Server no VS Code
# Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

## 📚 Documentação Rápida

```bash
# Next.js
open https://nextjs.org/docs

# Tailwind CSS
open https://tailwindcss.com/docs

# Framer Motion
open https://www.framer.com/motion/

# Radix UI
open https://www.radix-ui.com/

# TypeScript
open https://www.typescriptlang.org/docs/
```

---

**Dica:** Adicione esses comandos aos seus aliases do shell para acesso mais rápido!

```bash
# Exemplo de aliases (.bashrc ou .zshrc)
alias dev="npm run dev"
alias build="npm run build"
alias lint="npm run lint"
alias clean="rm -rf .next node_modules && npm install"
```
