# Deploy no Vercel - ServiceHub Pro

## 📋 Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Repositório Git (GitHub, GitLab, ou Bitbucket)
3. Node.js 18+ instalado localmente

## 🚀 Passos para Deploy

### 1. Preparação do Projeto

O projeto já está configurado para deploy no Vercel com:
- ✅ `vite.config.mjs` configurado para output em `dist/`
- ✅ `vercel.json` com configurações de SPA
- ✅ Scripts de build no `package.json`

### 2. Deploy via Vercel Dashboard

1. **Acesse** [vercel.com](https://vercel.com) e faça login
2. **Clique** em "New Project"
3. **Conecte** seu repositório Git
4. **Configure** as seguintes opções:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Variáveis de Ambiente (Opcional)

Se você quiser usar funcionalidades que dependem de APIs externas, configure no Vercel:

```
VITE_SUPABASE_URL=sua-url-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-supabase
```

### 4. Deploy via CLI (Alternativo)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## 🔧 Configurações do Projeto

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### vite.config.mjs
```javascript
export default defineConfig({
  build: {
    outDir: "dist", // Configurado para Vercel
    chunkSizeWarningLimit: 2000,
  },
  // ... outras configurações
});
```

## 📱 Funcionalidades Disponíveis

Após o deploy, todas as funcionalidades estarão disponíveis:

- **Dashboard Administrativo** (`/admin-dashboard`)
- **Gestão de Calendário** (`/calendar-management`)
- **Gestão de Reservas** (`/reservas-management`)
- **Gestão de Serviços** (`/services-management`)
- **Configuração de Serviços** (`/service-configuration`)
- **Gestão de Clientes** (`/client-management`)
- **Interface Pública** (`/public-booking-interface`)
- **Portal do Cliente** (`/client-portal-dashboard`)

## 🐛 Troubleshooting

### Erro: "No Output Directory named 'dist' found"
- ✅ **Resolvido**: Configuração atualizada para usar `dist/`

### Erro: "404 on page refresh"
- ✅ **Resolvido**: `vercel.json` configurado com rewrites para SPA

### Erro de Build
- Verifique se todas as dependências estão no `package.json`
- Execute `npm run build` localmente para testar

## 📊 Performance

O projeto está otimizado para produção com:
- **Vite** para build rápido
- **Tailwind CSS** com purge automático
- **Code splitting** automático
- **Lazy loading** de componentes
- **Chunk size** limitado a 2MB

## 🔗 URLs de Exemplo

Após o deploy, você terá URLs como:
- `https://seu-projeto.vercel.app/`
- `https://seu-projeto.vercel.app/admin-dashboard`
- `https://seu-projeto.vercel.app/services-management`

## ✅ Checklist Final

- [ ] Repositório Git criado e código commitado
- [ ] Projeto conectado no Vercel
- [ ] Build executado com sucesso
- [ ] Deploy realizado
- [ ] Todas as rotas funcionando
- [ ] Responsividade testada
- [ ] Funcionalidades principais testadas

---

**🎉 Seu ServiceHub Pro estará online e pronto para uso!**