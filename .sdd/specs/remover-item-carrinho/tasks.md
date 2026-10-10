# Tarefas: remover item do carrinho

Cada tarefa é pequena e pode ser verificada sozinha.

- [x] T1: `readCartEntries` devolve pares `{ stored, order }` e `readCart` usa essa lista  (arquivo: `shared/src/cart.ts`)  verificação: build e critérios de aceite 1 e 2 mostram a mesma ordem que o cookie.
- [x] T2: `writeStoredItems` centraliza a escrita do cookie, e `addItemToCart` passa a usá-la  (arquivo: `shared/src/cart.ts`)  verificação: adicionar item continua funcionando no cabeçalho.
- [ ] T3: `removeItemFromCart(index)` valida a posição e grava a lista sem a linha  (arquivo: `shared/src/cart.ts`)  verificação: critério de aceite 5 (posição inválida retorna falso). Pendente: a validação está no código, mas não foi testada.
- [x] T4: Server Action `removeFromCart` com `revalidatePath('/', 'layout')`  (arquivo: `user-profile/app/user-profile/actions.ts`)  verificação: critério de aceite 4 (contador do cabeçalho).
- [x] T5: botão client `RemoveButton` com `type="button"`, `aria-label` e desabilitado durante a ação  (arquivo: `user-profile/app/user-profile/remove-button.tsx`)  verificação: RF1 e RF6 no navegador.
- [x] T6: `page.tsx` renderiza o botão em cada linha, com a posição da linha  (arquivo: `user-profile/app/user-profile/page.tsx`)  verificação: critérios de aceite 1 a 3.
- [x] T7: `npm run build` e `npm run test:smoke` passam.  verificação: saída dos dois comandos.
