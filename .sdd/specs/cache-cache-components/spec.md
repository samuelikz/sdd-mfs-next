# Spec: cache com Cache Components (Next 16.4)

## Problema
Cada requisição do cardápio refaz o trabalho de montar a página, mesmo com um catálogo fixo.

## Objetivo
Cachear o que é estático (cardápio) e manter dinâmico o que depende do cookie (carrinho).

## Requisitos
- RF1: `cacheComponents` e `partialPrefetching` ativos nas zonas (`browse`, `restaurant-order`, `user-profile`).
- RF2: o cardápio (`RestaurantDetails`) usa `use cache` com `cacheLife('max')`. Recebe só o id, porque argumentos de cache precisam ser serializáveis.
- RF3: leituras de cookie ficam em `Suspense`: contador do cabeçalho e conteúdo do perfil.
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
- [ ] Dado o modo dev, quando o perfil carrega, então o conteúdo substitui o fallback "Carregando carrinho…". Pendente: no dev, o fallback não é trocado; em produção funciona.
