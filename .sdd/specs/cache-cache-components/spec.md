# Spec: cache com Cache Components (Next 16.4)

## Problema
Cada requisição do cardápio refaz o trabalho de montar a página, mesmo com um catálogo fixo.

## Objetivo
Cachear o que é estático (cardápio) e manter dinâmico o que depende do cookie (carrinho).

## Requisitos
- RF1: `cacheComponents` e `partialPrefetching` ativos em `browse` e `restaurant-order`. `user-profile` fica sem Cache Components, porque o conteúdo é por requisição (cookie) e o modo com Suspense travava no dev.
- RF2: o cardápio (`RestaurantDetails`) usa `use cache` com `cacheLife('max')`. Recebe só o id, porque argumentos de cache precisam ser serializáveis.
- RF3: leitura de cookie do contador do cabeçalho fica em `Suspense`. O conteúdo do perfil é renderizado na requisição, sem `Suspense`.
- RF4: a página do restaurante pré-renderiza os ids do catálogo com `generateStaticParams`, e ids desconhecidos respondem 404.
- RF5: adicionar ou remover no carrinho não invalida o cache do cardápio.

## Fora de escopo
- Cache do carrinho (depende do cookie por requisição, não pode ser cacheado).
- `use cache: private` ou `use cache: remote`.

## Critérios de aceite
- [x] Dado `npm run build`, então as rotas do restaurante aparecem como Partial Prerender.
- [x] Dado `/restaurant/99`, quando acessado, então a resposta é 404.
- [x] Dado o cardápio pré-renderizado, quando a página é buscada sem cookie, então o HTML já traz os itens.
- [x] Dado produção (`next start`), quando um item é adicionado e removido, então o cabeçalho e o total atualizam.
- [x] Dado o modo dev, quando o perfil carrega, então o conteúdo aparece (corrigido: `user-profile` saiu do Cache Components).
