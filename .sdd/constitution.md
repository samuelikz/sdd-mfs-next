# Constituição do projeto

Princípios que valem para toda feature do Feed me (versão Next.js em `next/`).

## Arquitetura

- Cada zona (`container`, `browse`, `restaurant-order`, `user-profile`) é dona das suas rotas e não importa código de outra zona.
- Código comum fica em `@feedme/shared`. Mudança nele afeta todas as zonas, então precisa de justificativa.
- Navegação entre zonas usa `<a>`, não `<Link>`.
- Lógica de negócio e preços vêm do servidor. O cliente nunca define preço.

## Qualidade

- Toda feature passa no build (`npm run build`) e no teste de fumaça (`npm run test:smoke`).
- Dados vindos de outro lugar são validados antes de usar.
- Sem emojis na interface. Ícones vêm do `lucide-react`.

## Idioma

- Nomes de código em inglês. Textos de tela, comentários e documentação em português do Brasil.
