# ⚡ Quick Start - EmpreGol

Guia de início rápido para começar a desenvolver em minutos.

## 🚀 Setup em 3 Passos

### 1️⃣ Instalar Dependências

```bash
npm install
```

### 2️⃣ Configurar Ambiente

```bash
# Copiar variáveis de ambiente
cp .env.example .env.local

# Editar .env.local com suas configurações (opcional para começar)
```

### 3️⃣ Rodar o Projeto

```bash
npm run dev
```

✅ **Pronto!** Acesse http://localhost:3000

---

## 📱 O Que Você Verá

### Landing Page (/)
- ✅ Hero section com busca de vagas
- ✅ Métricas animadas (12.5K+ profissionais, etc)
- ✅ Como funciona (3 passos)
- ✅ Features em bento grid
- ✅ Pricing para empresas
- ✅ CTA final

### Páginas de Autenticação
- ✅ `/login` - Login com email/senha + social
- ✅ `/cadastro` - Cadastro com seleção de tipo (candidato/empresa)

### Vagas
- ✅ `/vagas` - Listagem de vagas com filtros

---

## 🎨 Testando Componentes

### Testar Animações

Todas as seções têm animações no scroll. Role a página para ver:
- Fade in up
- Stagger animations
- Números contando
- Hover effects

### Testar Responsividade

Redimensione o navegador ou use DevTools (F12 > Toggle Device Toolbar):
- Mobile: 360px
- Tablet: 768px
- Desktop: 1024px+

### Testar Interações

- Hover nos cards (scale + glow)
- Hover nos botões (scale + glow aumentado)
- Clique no menu mobile (hamburguer)
- Busca de vagas (UI pronta)
- Filtros de vagas (UI pronta)

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Rodar com Turbopack (rápido!)

# Build & Produção
npm run build           # Build otimizado
npm start               # Rodar build de produção

# Qualidade
npm run lint            # Verificar erros
npm run lint -- --fix   # Corrigir automaticamente
```

---

## 📁 Estrutura Rápida

```
app/
├── page.tsx           → Landing page
├── login/page.tsx     → Login
├── cadastro/page.tsx  → Cadastro
└── vagas/page.tsx     → Listagem de vagas

components/
├── ui/                → Button, Input, Toast
├── layout/            → Navbar, Footer
├── sections/          → Hero, Metrics, Features, etc
└── cards/             → VagaCard

lib/
├── utils.ts           → cn() helper
└── animations.ts      → Framer Motion variants
```

---

## 🎯 Próximos Passos

### Para Desenvolvedores

1. **Ler a documentação completa**
   - `README.md` - Overview
   - `DEVELOPMENT.md` - Guia detalhado
   - `SNIPPETS.md` - Snippets úteis

2. **Explorar os componentes**
   - Veja como os componentes são construídos
   - Teste as animações e interações
   - Entenda o design system

3. **Começar a contribuir**
   - `CONTRIBUTING.md` - Guia de contribuição
   - Escolha uma feature do roadmap
   - Abra um PR!

### Para Designers

1. **Estudar o Design System**
   - Paleta de cores em `app/globals.css`
   - Classes utilitárias (glass, gradientes, glow)
   - Componentes visuais

2. **Criar Mockups**
   - Use as cores e estilos do projeto
   - Mantenha a identidade visual
   - Dark mode premium

3. **Propor Melhorias**
   - Abra issues com sugestões
   - Compartilhe mockups
   - Discuta UX

---

## 🐛 Problemas Comuns

### Porta 3000 em Uso

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Erro ao Instalar Dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de Build

```bash
# Limpar cache do Next.js
rm -rf .next
npm run dev
```

---

## 📚 Recursos

### Documentação
- [README.md](README.md) - Overview do projeto
- [DEVELOPMENT.md](DEVELOPMENT.md) - Guia completo
- [SNIPPETS.md](SNIPPETS.md) - Code snippets
- [COMMANDS.md](COMMANDS.md) - Lista de comandos
- [CONTRIBUTING.md](CONTRIBUTING.md) - Como contribuir

### Stack
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)

---

## 💡 Dicas

### VS Code

1. **Instale as extensões recomendadas**
   - Abra o projeto no VS Code
   - Clique em "Instalar" quando aparecer a notificação
   - Ou veja `.vscode/extensions.json`

2. **Use os atalhos**
   - `Ctrl+P` - Quick Open
   - `Ctrl+Shift+P` - Command Palette
   - `Ctrl+`` - Toggle Terminal

### Chrome DevTools

1. **Inspecione elementos** - `Ctrl+Shift+C`
2. **Teste responsividade** - `Ctrl+Shift+M`
3. **Veja animações** - DevTools > More Tools > Animations

### Git

1. **Commits convencionais**
   ```bash
   git commit -m "feat: adiciona nova feature"
   git commit -m "fix: corrige bug"
   git commit -m "docs: atualiza documentação"
   ```

2. **Branches organizadas**
   ```bash
   git checkout -b feature/nome-da-feature
   git checkout -b fix/nome-do-fix
   ```

---

## 🎉 Está Pronto!

Agora você tem tudo para começar a desenvolver no EmpreGol!

### Checklist

- [x] Dependências instaladas
- [x] Servidor rodando
- [x] Landing page funcionando
- [x] Documentação lida
- [ ] Primeira contribuição feita 😉

---

**Dúvidas?** Consulte a documentação ou abra uma issue!

**Feito com 💜 no Brasil**
