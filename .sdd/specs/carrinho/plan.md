# Plano: carrinho

> Retroativo, com a correção de preço.

## Zonas afetadas
- `shared`: `cart.ts` (leitura e escrita do cookie), `shell.tsx` (contador do cabeçalho).
- `user-profile`: `app/user-profile/page.tsx` (lista e total).
- `restaurant-order`: `app/actions.ts` (grava o item).

## Decisões de arquitetura
- Decisão: cookie em vez de `localStorage`. Motivo: o servidor lê o carrinho e renderiza o total sem flash. Alternativas descartadas: `localStorage` (só o cliente lê) e banco (não há backend de pedidos).
- Decisão: cookie guarda só ids, e o preço é resolvido no catálogo. Motivo: a constituição diz que o cliente nunca define preço. Antes, o preço era gravado no cookie, e um cookie editado mudava o total. Alternativa descartada: assinar o cookie com HMAC, que exigiria um segredo no servidor sem necessidade aqui.

## Dados e contratos
- Cookie `feedme_cart`: `[{ "restaurantId": 2, "itemIndex": 0 }, ...]`, codificado com `encodeURIComponent`.
- `readCart(): Promise<Order[]>` com `Order = { restaurant, item, price, quantity }`.
- Migração: cookies no formato antigo (com `restaurant` e `price`) não passam na validação e viram carrinho vazio.

## Riscos
- Cookie antigo some para quem já tinha itens: aceitável, é um tutorial.
- Cookie continua editável, mas agora só altera quais itens reais estão no carrinho, não o preço.

## Como validar
- `npm run build`.
- `npm run test:smoke` (rota `/user-profile` com "Seu carrinho").
- Manual: editar o cookie `feedme_cart` no DevTools com `price: 0` e conferir que o total não muda.
