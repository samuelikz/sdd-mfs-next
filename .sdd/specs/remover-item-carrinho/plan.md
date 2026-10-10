# Plano: remover item do carrinho

## Zonas afetadas
- `shared`: `cart.ts` (nova `removeItemFromCart`, `readCartEntries` e escrita do cookie compartilhada). Mudança com impacto em todas as zonas, justificada por `readCart` ser a única fonte da lista.
- `user-profile`: `app/user-profile/actions.ts` (Server Action nova) e `app/user-profile/remove-button.tsx` (botão client), usados em `app/user-profile/page.tsx`.
- `browse`, `restaurant-order`, `container`: sem mudança.

## Decisões de arquitetura
- Decisão: remover pela posição na lista exibida. Motivo: itens repetidos são linhas iguais, e a posição identifica a linha sem precisar de id no cookie. Alternativas descartadas: id único por linha (mais dados no cookie, sem ganho aqui) e remover pela primeira ocorrência de restaurante+item (apagaria uma linha diferente da clicada quando há repetidos).
- Decisão: `readCartEntries` devolve pares `{ stored, order }` na mesma ordem. Motivo: corrige o desalinhamento atual entre a lista exibida e o cookie quando há item inválido. `readCart` e a remoção passam a usar a mesma lista.
- Decisão: Server Action dentro da zona `user-profile`, não em `shared`. Motivo: mesma regra de `restaurant-order/app/actions.ts` (CLAUDE.md).
- Decisão: `revalidatePath('/', 'layout')` após remover. Motivo: o contador do cabeçalho está no layout compartilhado.
- Decisão: escrita do cookie em função própria (`writeStoredItems`), usada por adicionar e remover. Motivo: evitar duplicar as opções do cookie.

## Dados e contratos
- Server Action `removeFromCart(index: number): Promise<boolean>` em `user-profile/app/user-profile/actions.ts`.
- `removeItemFromCart(index: number): Promise<boolean>` em `shared/src/cart.ts`: valida `Number.isInteger(index)` e `0 <= index < length`.
- Cookie `feedme_cart`: continua no formato `{ restaurantId, itemIndex }`. Itens inválidos são removidos do cookie na próxima escrita.

## Riscos
- Página desatualizada (outra aba removeu itens antes): a posição pode apontar para outro item. Aceitável para um tutorial; o próximo render mostra o estado real. Ceiling: sem id por linha.
- Remoção rápida em duplo clique: o botão fica desabilitado durante a ação (RF6).

## Como validar
- `npm run build`.
- `npm run test:smoke`.
- Manual no navegador: critérios de aceite da spec, com o dev rodando.
