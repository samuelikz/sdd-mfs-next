# Spec: busca de restaurantes

> Retroativa: feature já implementada. Escrita para documentar o que existe.

## Problema
Quem abre o app não sabe o que existe por perto e precisa achar um restaurante ou uma culinária rapidamente.

## Objetivo
Mostrar a lista de restaurantes e permitir filtrar por texto e por culinária.

## Usuários e jornada
1. Usuário abre `/` e vê o título "Com fome de quê hoje?" e a lista completa.
2. Digita no campo de busca. A lista filtra por nome ou culinária.
3. Clica em um chip de culinária. A lista mostra só aquela culinária.
4. Clica em um card. Vai para `/restaurant/:id`, que pertence à zona de pedidos.

## Requisitos
- RF1: mostrar todos os restaurantes de `RESTAURANTS` (fonte única em `@feedme/shared`).
- RF2: filtrar por texto, sem diferenciar maiúsculas, em nome e culinária.
- RF3: filtrar por culinária, com o chip "Todas" como padrão.
- RF4: cada card leva ao cardápio do restaurante com um `<a>`, não `<Link>`.
- RF5: quando nada bate, mostrar mensagem de lista vazia.

## Fora de escopo
- Busca no servidor ou paginação.
- Localização e distância.

## Critérios de aceite
- [x] Dado a página inicial aberta, quando nenhum filtro está ativo, então os 4 restaurantes aparecem.
- [x] Dado o texto "sushi", quando digitado, então só "Sushi Zen" aparece.
- [x] Dado o chip "Italiana", quando clicado, então só "Cantina da Nonna" aparece.
- [x] Dado o card "Taco Loco", quando clicado, então a navegação vai para `/restaurant/4` com recarga completa.

## Perguntas em aberto
- Nenhuma.
