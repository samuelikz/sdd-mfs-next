# Plano: cardápio e pedido de um restaurante

> Retroativo.

## Zonas afetadas
- `restaurant-order`: `app/restaurant/[id]/page.tsx` (cardápio, server component), `app/add-button.tsx` (botão), `app/actions.ts` (Server Action).
- `shared`: `cart.ts` (gravação do item), `restaurants.ts` (catálogo).

## Decisões de arquitetura
- Decisão: Server Action dentro da zona, não no pacote `shared`. Motivo: `shared` importado pelo cliente puxaria `next/headers` para o bundle. Referência: CLAUDE.md.
- Decisão: `revalidatePath('/', 'layout')` após adicionar. Motivo: o contador está no layout compartilhado.

## Dados e contratos
- Server Action `addToCart(restaurantId: string, itemIndex: number): Promise<boolean>`.
- Cookie `feedme_cart`: lista de `{ restaurantId, itemIndex }`. Sem preço. Ver a spec do carrinho.

## Riscos
- Cookie editado pelo cliente: itens inválidos são descartados na leitura.

## Como validar
- `npm run test:smoke` (rotas `/restaurant/2`, `/restaurant/99`, `/restaurant/constructor`).
- Manual: critérios de aceite acima.
