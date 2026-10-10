# Plano: busca de restaurantes

> Retroativo.

## Zonas afetadas
- `browse`: `app/page.tsx` e `app/restaurant-list.tsx` (estado da busca e dos filtros, client component).
- `shared`: `restaurants.ts` (catálogo).

## Decisões de arquitetura
- Decisão: filtro feito no cliente, sobre o array completo. Motivo: são 4 restaurantes e o catálogo já vai para o navegador. Alternativas descartadas: Server Action ou query string, por custo sem ganho aqui.
- Decisão: `<a>` nos cards. Motivo: a rota de destino está em outra zona do Multi-Zones.

## Dados e contratos
- Entrada: `RESTAURANTS` de `@feedme/shared/restaurants`.
- Saída: links `/restaurant/:id`.

## Riscos
- Catálogo no bundle do cliente: aceitável enquanto os dados são fixos.

## Como validar
- `npm run build` e `npm run test:smoke` (rota `/` com o título).
- Manual: os critérios de aceite acima.
