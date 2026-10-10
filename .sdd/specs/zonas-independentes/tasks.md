# Tarefas: zonas independentes

- [x] T1: catálogo em `restaurant-order/lib/catalog.ts`, com `iconName` no lugar do componente  (arquivo: `restaurant-order/lib/catalog.ts`)  verificação: build.
- [x] T2: API `GET /api/restaurants`  (arquivo: `restaurant-order/app/api/restaurants/route.ts`)  verificação: `curl` retorna 4 restaurantes.
- [x] T3: contrato do catálogo e cliente da API em `shared`  (arquivo: `shared/src/catalog.ts`)  verificação: `grep` em `shared/` sem importar o catálogo.
- [x] T4: `shared/cart.ts` só lê e grava o contrato do cookie  (arquivo: `shared/src/cart.ts`)  verificação: build.
- [x] T5: `restaurant-order` valida id e índice antes de gravar  (arquivo: `restaurant-order/app/actions.ts`)  verificação: build; teste de rejeição pendente.
- [x] T6: `browse` lê o catálogo pela API com `use cache`  (arquivos: `browse/app/page.tsx`, `browse/app/restaurant-list.tsx`)  verificação: lista na home no navegador.
- [x] T7: `user-profile` resolve nome e preço pela API  (arquivos: `user-profile/app/user-profile/cart-entries.ts`, `page.tsx`, `actions.ts`)  verificação: perfil e remoção no navegador; cookie inválido ignorado.
- [x] T8: "Surpreenda-me" usa a API  (arquivo: `container/app/random/route.ts`)  verificação: redireciona para `/restaurant/1`.
- [x] T9: constituição atualizada com os contratos e o que fica em `shared`  (arquivo: `.sdd/constitution.md`)  verificação: revisão.
