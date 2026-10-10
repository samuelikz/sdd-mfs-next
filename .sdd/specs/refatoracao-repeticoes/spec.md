# Spec: refatoração para remover repetições

## Problema
As zonas repetem configuração, metadados, portas e a revalidação do carrinho. Uma mudança precisa ser feita em vários lugares.

## Objetivo
Cada informação vive em um único lugar, sem mudar comportamento.

## Requisitos
- RF1: nome, porta e rotas das zonas ficam em `zones.json`, lido pelo container e pelo `dev-all.js`.
- RF2: metadados comuns ficam em `@feedme/shared/metadata`.
- RF3: a revalidação do cabeçalho fica em `shared/cart.ts`, e as Server Actions só chamam as funções do carrinho.
- RF4: nenhum comportamento visível muda.

## Fora de escopo
- Unir os botões client de adicionar e remover.
- Unir os estilos de botão pill entre zonas (o prefixo por zona é a convenção).
- Remover os `package.json` e `tsconfig.json` por zona, que o workspace exige.

## Critérios de aceite
- [x] Dado `npm run build`, então as quatro zonas compilam.
- [x] Dado `npm run test:smoke` em processos novos, então as 7 verificações passam.
- [x] Dado adicionar e remover no navegador, então o cabeçalho e o total atualizam sem recarregar.
