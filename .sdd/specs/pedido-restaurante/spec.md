# Spec: cardápio e pedido de um restaurante

> Retroativa: feature já implementada. Escrita para documentar o que existe.

## Problema
Depois de escolher um restaurante, o usuário precisa ver o cardápio e colocar itens no carrinho.

## Objetivo
Mostrar o cardápio de um restaurante e permitir adicionar itens ao carrinho com um clique.

## Usuários e jornada
1. Usuário abre `/restaurant/:id` e vê o cabeçalho do restaurante e o cardápio.
2. Clica em "Adicionar" em um item. O botão mostra "Adicionado" por um instante.
3. O contador do cabeçalho sobe, sem recarregar a página.
4. Id inexistente mostra a página 404.

## Requisitos
- RF1: mostrar nome, culinária, avaliação e preço de cada item, lidos do catálogo.
- RF2: "Adicionar" chama uma Server Action com só o id do restaurante e o índice do item.
- RF3: o servidor decide nome e preço. O cliente não envia preço.
- RF4: itens e restaurantes inexistentes retornam falha, sem gravar nada.
- RF5: depois de adicionar, o cabeçalho é atualizado.

## Fora de escopo
- Escolha de quantidade e observações no item.
- Pagamento e finalização do pedido.

## Critérios de aceite
- [x] Dado `/restaurant/2`, quando a página abre, então aparece "Sushi Zen" com 3 itens.
- [x] Dado "Temaki salmão" clicado, quando a ação termina, então o contador do cabeçalho sobe em 1.
- [x] Dado `/restaurant/99`, quando acessado, então a resposta é 404.
- [x] Dado `/restaurant/constructor`, quando acessado, então a resposta é 404 (chave de Object não vira restaurante).

## Perguntas em aberto
- Nenhuma.
