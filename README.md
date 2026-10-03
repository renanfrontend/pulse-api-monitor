# Pulse

Visibilidade em cada request. Monitor HTTP manual com latência, timeout e histórico. Modo demo sem serviços externos.

Projeto autoral demonstrativo preparado para o portfólio de **Renan Augusto dos Santos**. Não possui backend, autenticação ou dados de produção.

## 🇧🇷 Português

### Executar

Requer Node.js 22.13+ e npm.

```bash
npm install
npm run dev
```

```bash
npm test
npm run build
npm run preview
```

### Funcionalidades

Monitor HTTP manual com latência, timeout e histórico. Modo demo sem serviços externos.

Tema claro/escuro, layout responsivo, foco visível e formulários com rótulos. Interface em português. README bilíngue.

### Arquitetura

- `src/App.tsx`: experiência específica do produto.
- `src/domain.js`: funções puras de domínio, verificadas por testes.
- `src/shared.tsx`: shell, indicadores e persistência local.
- `src/styles.css`: tokens e estilos responsivos.
- `tests/`: regras de negócio e casos de borda.
- `.github/workflows/ci.yml`: testes e build a cada push/PR.

Os dados ficam no navegador quando há persistência. Limpar o armazenamento remove os dados. A aplicação é uma demonstração; não há sincronização entre dispositivos. O monitor Pulse depende de CORS no modo real. O Routecraft usa distância geográfica, sem roteamento viário. O laboratório de acessibilidade não certifica conformidade WCAG.

### Deploy

Execute `npm run build` e publique `dist/` em um host estático. Para GitHub Pages configure a base do Vite conforme o nome do repositório. Nenhum deploy é executado por este projeto automaticamente.

## 🇺🇸 English

A React + TypeScript frontend portfolio demo by Renan Augusto. Install with `npm install`, start with `npm run dev`, verify with `npm test` and `npm run build`. Deploy the generated `dist/` directory to a static hosting provider.

Includes responsive UI, light/dark themes, labeled controls and visible focus. The UI is in Brazilian Portuguese. No backend or production authentication is provided. Browser storage is device-local. API monitoring requires CORS; routing uses geographic distances, not roads; the accessibility lab evaluates selected color contrast only.

## Autoria e apresentação

Explique as regras de domínio, decisões de arquitetura e limitações em uma entrevista. Personalize os casos de uso e acrescente melhorias próprias ao evoluir o projeto.
