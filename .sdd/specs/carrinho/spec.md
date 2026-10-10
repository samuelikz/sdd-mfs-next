# Spec: carrinho

> Retroativa, com a correção de preço incluída.

## Problema
O carrinho precisa sobreviver entre páginas e zonas e mostrar o total certo, sem depender do cliente para o preço.

## Objetivo
Guardar o carrinho no servidor (cookie), mostrar o contador no cabeçalho e o total na página de perfil.

## Usuários e jornada
1. Usuário adiciona itens em qualquer restaurante.
2. O contador do cabeçalho mostra a quantidade.
3. Em `/user-profile`, vê cada item, o preço e o total.

## Requisitos
- RF1: o carrinho é lido no servidor, então a primeira resposta já traz o contador certo.
- RF2: o preço de cada item vem do catálogo, a cada leitura.
- RF3: o cookie guarda só `restaurantId` e `itemIndex`.
- RF4: cookie adulterado, antigo ou com item inexistente é descartado sem erro.
- RF5: o carrinho tem no máximo 50 itens.

## Fora de escopo
- Remover itens ou alterar quantidade.
- Persistência além do cookie de 24 horas.

## Critérios de aceite
- [x] Dado um cookie com `"price": 0`, quando a página de perfil abre, então o total usa o preço do catálogo.
- [x] Dado um cookie com `restaurantId` inexistente, quando lido, então o item é ignorado.
- [x] Dado 50 itens no carrinho, quando adiciona outro, então a ação retorna falso.
- [x] Dado o cabeçalho, quando um item é adicionado, então o contador sobe em 1.

## Perguntas em aberto
- Nenhuma.
