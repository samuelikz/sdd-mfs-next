# Tarefas: carrinho

> Retroativo. T1 a T3 foram feitas antes da correção. T4 a T6 são a correção de preço.

- [x] T1: cookie com preço e leitura no servidor  (arquivo: `shared/src/cart.ts`)  verificação: contador no cabeçalho.
- [x] T2: contador no cabeçalho  (arquivo: `shared/src/shell.tsx`)  verificação: critério de aceite 4.
- [x] T3: total na página de perfil  (arquivo: `user-profile/app/user-profile/page.tsx`)  verificação: `/user-profile` com "Seu carrinho".
- [x] T4: cookie passa a guardar só ids e índice  (arquivo: `shared/src/cart.ts`)  verificação: o cookie gravado não tem campo de preço.
- [x] T5: `readCart` resolve nome e preço no catálogo e descarta itens inexistentes  (arquivo: `shared/src/cart.ts`)  verificação: critérios de aceite 1 e 2.
- [x] T6: `addItemToCart` valida id e índice antes de gravar  (arquivo: `shared/src/cart.ts`)  verificação: critério de aceite 3 e build.
