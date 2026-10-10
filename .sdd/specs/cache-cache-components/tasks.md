# Tarefas: cache com Cache Components

- [x] T1: `cacheComponents` e `partialPrefetching` nas três zonas  (arquivos: `*/next.config.ts`)  verificação: build.
- [x] T2: `Shell` com contador do carrinho em `Suspense`  (arquivo: `shared/src/shell.tsx`, `shared/src/header.tsx`)  verificação: cabeçalho no navegador.
- [x] T3: perfil com conteúdo do carrinho em `Suspense`  (arquivo: `user-profile/app/user-profile/page.tsx`)  verificação: produção.
- [x] T4: `RestaurantDetails` com `use cache` e `generateStaticParams`  (arquivos: `restaurant-order/app/restaurant/[id]/restaurant-details.tsx`, `page.tsx`)  verificação: build e smoke.
- [x] T5: `instant = false` na rota do restaurante, para o 404 ter status certo  (arquivo: `restaurant-order/app/restaurant/[id]/page.tsx`)  verificação: `/restaurant/99` retorna 404.
- [x] T6: build e smoke em produção  verificação: 7 de 7 passam.
- [x] T7: `user-profile` sem Cache Components; o `Suspense` do perfil saiu  (arquivos: `user-profile/next.config.ts`, `user-profile/app/user-profile/page.tsx`)  verificação: perfil no dev e em produção.
