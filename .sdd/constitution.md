# Constituição do projeto

Princípios que valem para toda feature do Feed me (versão Next.js em `next/`).

## Arquitetura

- Cada zona (`container`, `browse`, `restaurant-order`, `user-profile`) é dona das suas rotas e não importa código de outra zona.
- Cada dado de negócio tem um único dono. O catálogo de restaurantes é da zona `restaurant-order`, que o expõe em `GET /api/restaurants`. Outras zonas leem pela API.
- Zonas se falam por contratos explícitos: a API HTTP do catálogo e o cookie `feedme_cart`. Nada de importar dados ou componentes de outra zona.
- `@feedme/shared` contém só o que é de plataforma:
  - casca visual (`Shell`, `Header`, `Footer`, tokens CSS);
  - formatação de moeda e metadados comuns;
  - contrato do carrinho (`cart.ts`: formato do cookie, leitura e escrita);
  - contrato do catálogo (`catalog.ts`: tipos e cliente da API).
- Mudança em `shared` afeta todas as zonas, então precisa de justificativa registrada na spec.
- Navegação entre zonas usa `<a>`, não `<Link>`.
- A navegação do cabeçalho é um contrato da plataforma e fica em `shared/src/header.tsx`. Adicionar uma zona nova exige editar esse arquivo.
- Preço e validação de itens vêm do servidor da zona de pedidos. O cliente nunca define preço, e o carrinho guarda só ids.
- Zonas que leem o catálogo resolvem nome e preço com ele. Item que o catálogo não reconhece é descartado.
- Cache: `browse` usa `use cache` no catálogo. `restaurant-order` usa `use cache` no cardápio. `user-profile` não usa Cache Components, porque o carrinho é por requisição.
- Variáveis de ambiente: `RESTAURANT_ORDER_URL` aponta a zona de pedidos para as outras zonas (padrão `http://localhost:3002`). Cada zona de URL própria é definida em `zones.json`.

## Qualidade

- Toda feature passa no build (`npm run build`) e no teste de fumaça (`npm run test:smoke`).
- Dados vindos de outro lugar são validados antes de usar.
- Sem emojis na interface. Ícones vêm do `lucide-react`. O catálogo guarda o nome do ícone, não o componente, porque funções não atravessam a API.

## Idioma

- Nomes de código em inglês. Textos de tela, comentários e documentação em português do Brasil.
