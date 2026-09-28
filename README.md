# Oficina Mecânica Trevo - Sistema Web Completo

Sistema web moderno, responsivo e interativo para a **Oficina Mecânica Trevo**, incluindo agendamento de serviços, orçamentos online com cálculo técnico de mão de obra e peças, loja de óleos lubrificantes com carrinho de compras, rastreador de ordens de serviço por placa/protocolo e painel de gestão exclusivo para o proprietário (senha padrão: `trevo123`).

---

## 🚀 Como publicar no GitHub Pages sem tela branca

O problema comum de "tela branca" em projetos Vite no GitHub ocorre porque os caminhos dos arquivos compilados (`.js` e `.css`) buscam a raiz do domínio (`/assets/...`) em vez do caminho relativo do repositório (`./assets/...`). 

Este projeto já está configurado com `base: './'` no arquivo `vite.config.ts`, permitindo que o sistema funcione em qualquer URL ou subpasta do GitHub.

### Opção 1: Publicação Automática com GitHub Actions (Recomendado)

1. Suba os arquivos do projeto para o seu repositório no GitHub (incluindo a pasta `.github/workflows/deploy.yml` já criada).
2. No seu repositório no GitHub, clique na aba **Settings** (Configurações).
3. No menu lateral esquerdo, clique em **Pages**.
4. Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
5. Vá na aba **Actions** e veja o workflow `Deploy to GitHub Pages` rodando automaticamente.
6. Em cerca de 1 minuto, o link do seu site estará online e funcionando!

### Opção 2: Publicação Manual com a pasta `dist`

1. Execute no terminal:
   ```bash
   npm run build
   ```
2. A pasta `dist/` conterá todos os arquivos estáticos prontos para publicação (com `index.html` e caminhos relativos `./assets`).
3. Você pode publicar o conteúdo da pasta `dist/` no branch `gh-pages` ou arrastar para a Vercel, Netlify ou Cloudflare Pages.

---

## 🛠️ Tecnologias Utilizadas

- **React 19 + TypeScript**
- **Vite** com suporte a caminhos relativos
- **Tailwind CSS v4**
- **Lucide React** (ícones automotivos e de navegação)
- **LocalStorage com ErrorBoundary** para persistência de dados local sem travar o navegador
