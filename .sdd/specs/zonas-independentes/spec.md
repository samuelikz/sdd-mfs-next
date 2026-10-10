# Spec: zonas independentes

## Problema
O catálogo de restaurantes e a lógica de preço estão em `@feedme/shared`, então todas as zonas dependem do mesmo código de negócio. O `container` também sabe quantos restaurantes existem. Uma mudança no cardápio exige publicar todas as zonas.

## Objetivo
Cada dado de negócio tem um único dono. As zonas se falam por contratos explícitos (API HTTP e cookie), e `@feedme/shared` fica só com a casca visual e os contratos.

## Requisitos
- RF1: o catálogo vive em `restaurant-order`, que o expõe em `GET /api/restaurants`.
- RF2: `browse` lê o catálogo pela API da zona de pedidos, com cache por `use cache`.
- RF3: `user-profile` lê o catálogo pela API para calcular nome e preço dos itens do carrinho.
- RF4: `restaurant-order` valida id e índice com o próprio catálogo antes de gravar no carrinho.
- RF5: `shared/cart` guarda só o contrato do cookie (`restaurantId`, `itemIndex`). Não conhece catálogo nem preço.
- RF6: o "Surpreenda-me" do `container` pede um id à API da zona de pedidos, em vez de fixar o total.
- RF7: a lista de zonas e de rotas continua em `zones.json`. Nenhuma zona importa código de outra.
- RF8: `@feedme/shared` contém só: casca visual (`Shell`, `Header`, tokens), formatação, metadados, contrato do carrinho e contrato do catálogo (tipos e cliente da API).
- RF9: o cabeçalho continua com a navegação da plataforma. Essa lista é um contrato da casca, documentado na constituição.

## Fora de escopo
- Banco de dados ou backend real para o catálogo.
- Autenticação.
- Mudança no formato do cookie do carrinho.

## Critérios de aceite
- [x] Dado `GET /api/restaurants` na zona de pedidos, quando chamado, então retorna os 4 restaurantes sem preço calculado no cliente.
- [x] Dado a página inicial, quando carrega, então a lista vem da API e o filtro continua funcionando.
- [x] Dado um cookie com id inexistente, quando o perfil abre, então o item é ignorado.
- [ ] Dado "Adicionar", quando o id não existe no catálogo da zona de pedidos, então nada é gravado. Pendente: validação implementada em `restaurant-order/app/actions.ts`, ainda não testada no navegador.
- [x] Dado "Surpreenda-me", quando acessado, então redireciona para um restaurante da API.
- [x] Dado `grep` por `restaurants` em `shared/`, então não há importação do catálogo.

## Perguntas em aberto
- Nenhuma.
