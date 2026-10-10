# Spec: remover item do carrinho

## Problema
O usuário adiciona um item por engano e não tem como tirá-lo do carrinho. Hoje só dá para adicionar.

## Objetivo
Permitir remover um item específico do carrinho, sem afetar os outros.

## Usuários e jornada
1. Usuário abre `/user-profile` com itens no carrinho.
2. Cada item tem um botão "Remover" com ícone de lixeira.
3. Clica em "Remover" em um item. Ele some da lista e o total é recalculado.
4. O contador do cabeçalho diminui em 1.
5. Se o carrinho ficar vazio, aparece a mensagem de carrinho vazio.

## Requisitos
- RF1: cada linha do carrinho tem um botão "Remover" com `aria-label` que cita o nome do item.
- RF2: remover apaga só a linha clicada. Itens repetidos são linhas separadas, e remover uma não apaga as outras.
- RF3: o total e o contador do cabeçalho são atualizados depois da remoção.
- RF4: a posição enviada ao servidor precisa ser um inteiro dentro da lista atual. Posição inválida não altera o carrinho.
- RF5: a posição da linha na tela é a mesma usada pelo servidor. Itens gravados que não existem mais no catálogo são descartados antes da numeração.
- RF6: enquanto a remoção está em andamento, o botão fica desabilitado.

## Fora de escopo
- Alterar quantidade.
- Esvaziar o carrinho inteiro.
- Desfazer a remoção.

## Critérios de aceite
- [x] Dado um carrinho com "Temaki salmão" e "Missoshiru", quando "Remover" é clicado em "Temaki salmão", então só "Missoshiru" permanece e o total mostra R$ 12,00.
- [x] Dado dois "Missoshiru" no carrinho, quando um é removido, então resta uma linha "Missoshiru".
- [x] Dado o último item removido, quando a página atualiza, então aparece "Seu carrinho está vazio.".
- [x] Dado o cabeçalho com 2 itens, quando um é removido, então o contador mostra 1.
- [ ] Dado uma posição fora da lista enviada ao servidor, quando a ação roda, então ela retorna falso e o carrinho não muda.

## Perguntas em aberto
- Nenhuma.
