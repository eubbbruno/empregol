# 🚀 Deploy na Vercel - EmpreGol

Guia completo para fazer deploy do EmpreGol na Vercel.

## 📋 Pré-requisitos

- ✅ Build local funcionando (`npm run build` sem erros)
- ✅ Código no GitHub (https://github.com/eubbbruno/empregol)
- ✅ Conta na Vercel (https://vercel.com)
- ✅ Supabase configurado

## 🚀 Método 1: Deploy via Vercel Dashboard (Recomendado)

### Passo 1: Importar Projeto

1. Acesse https://vercel.com/dashboard
2. Clique em **Add New...** → **Project**
3. Clique em **Import Git Repository**
4. Selecione o repositório `eubbbruno/empregol`
5. Clique em **Import**

### Passo 2: Configurar Projeto

**Framework Preset:** Next.js (detectado automaticamente)

**Root Directory:** `./` (deixe como está)

**Build Command:** `npm run build` (padrão)

**Output Directory:** `.next` (padrão)

**Install Command:** `npm install` (padrão)

### Passo 3: Adicionar Environment Variables

Clique em **Environment Variables** e adicione:

```
NEXT_PUBLIC_SUPABASE_URL = https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sua-chave-anon-aqui
```

**IMPORTANTE:** 
- Copie os valores do seu arquivo `.env.local`
- Ou pegue no Supabase Dashboard → Settings → API
- Adicione para **Production**, **Preview** e **Development**

### Passo 4: Deploy

1. Clique em **Deploy**
2. Aguarde o build (1-3 minutos)
3. ✅ Deploy concluído!

Sua URL será algo como: `https://empregol.vercel.app`

---

## 🚀 Método 2: Deploy via Vercel CLI

### Instalar Vercel CLI

```bash
npm install -g vercel
```

### Login

```bash
vercel login
```

### Deploy

```bash
# Deploy preview
vercel

# Deploy produção
vercel --prod
```

### Adicionar Environment Variables via CLI

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Cole o valor quando solicitado

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Cole o valor quando solicitado
```

---

## ⚙️ Configurações Avançadas

### Custom Domain

1. No Vercel Dashboard, vá em **Settings** → **Domains**
2. Adicione seu domínio (ex: `empregol.com.br`)
3. Configure os DNS records conforme instruções
4. Aguarde propagação (pode levar até 48h)

### Configurar Redirects

Criar arquivo `vercel.json` na raiz:

```json
{
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### Analytics

1. No Vercel Dashboard, vá em **Analytics**
2. Habilite **Web Analytics**
3. Adicione o script no `app/layout.tsx` (opcional)

### Speed Insights

1. No Vercel Dashboard, vá em **Speed Insights**
2. Habilite
3. Instale o pacote:

```bash
npm install @vercel/speed-insights
```

4. Adicione no layout:

```tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## 🔄 CI/CD Automático

Após o primeiro deploy, a Vercel configura CI/CD automaticamente:

- **Push para `master`** → Deploy em produção
- **Push para outras branches** → Deploy preview
- **Pull Requests** → Deploy preview com URL única

### Configurar Branch Protection (GitHub)

1. Vá em Settings → Branches
2. Adicione rule para `master`
3. Marque:
   - ✅ Require status checks to pass
   - ✅ Require Vercel deployment to succeed

---

## 🧪 Testar Deploy

### 1. Verificar Build

```bash
# Local
npm run build
npm start

# Acesse http://localhost:3000
```

### 2. Verificar Produção

Após deploy:
1. Acesse a URL da Vercel
2. Teste todas as páginas:
   - `/` - Landing page
   - `/login` - Login
   - `/cadastro` - Cadastro
   - `/vagas` - Listagem de vagas
   - `/dashboard` - Dashboard candidato (precisa login)
   - `/empresa/dashboard` - Dashboard empresa (precisa login)

### 3. Verificar Logs

No Vercel Dashboard:
- **Deployments** → Clique no deploy → **Logs**
- Verifique se há erros

---

## 🐛 Troubleshooting

### Build falha na Vercel

**Erro:** `Module not found`
- Verifique se todas as dependências estão no `package.json`
- Rode `npm install` localmente

**Erro:** `Environment variable not found`
- Adicione as env vars no Vercel Dashboard
- Redeploy o projeto

**Erro:** `Build timeout`
- Projeto muito grande
- Otimize imports
- Use dynamic imports para componentes pesados

### Página 404 após deploy

- Verifique se a rota existe em `app/`
- Limpe o cache: Settings → Clear Cache

### Imagens não carregam

- Verifique `next.config.ts` → `images.remotePatterns`
- Adicione domínios permitidos

### Supabase não conecta

- Verifique env vars na Vercel
- Teste a URL do Supabase no browser
- Verifique se o projeto Supabase está ativo

---

## 📊 Monitoramento

### Vercel Analytics

- **Real-time visitors**
- **Page views**
- **Top pages**
- **Devices & browsers**

### Vercel Speed Insights

- **Core Web Vitals**
- **LCP, FID, CLS**
- **Performance score**

### Logs

- **Function logs** - Erros de runtime
- **Build logs** - Erros de build
- **Edge logs** - Middleware logs

---

## 🎯 Checklist de Deploy

- [ ] Build local funcionando (`npm run build`)
- [ ] Código no GitHub
- [ ] Projeto importado na Vercel
- [ ] Environment variables configuradas
- [ ] Deploy concluído com sucesso
- [ ] Landing page carregando
- [ ] Autenticação funcionando
- [ ] Dashboards funcionando
- [ ] Custom domain configurado (opcional)
- [ ] Analytics habilitado (opcional)

---

## 🔗 Links Úteis

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Docs:** https://vercel.com/docs
- **Next.js on Vercel:** https://vercel.com/docs/frameworks/nextjs
- **Environment Variables:** https://vercel.com/docs/projects/environment-variables

---

## 📝 Comandos Rápidos

```bash
# Deploy preview
vercel

# Deploy produção
vercel --prod

# Ver logs
vercel logs

# Listar deployments
vercel ls

# Ver env vars
vercel env ls

# Adicionar env var
vercel env add NOME_DA_VARIAVEL
```

---

**🎉 Seu EmpreGol estará no ar em minutos!**

Após o deploy, compartilhe a URL: `https://empregol.vercel.app` 🚀
