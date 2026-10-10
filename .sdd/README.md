# Kit de SDD

Spec-Driven Development: a especificação vem antes do código. Esta pasta é versionada junto com o projeto.

## Fluxo

1. **Constituição** (`constitution.md`): princípios e restrições que valem para todas as features.
2. **Spec** (`specs/<feature>/spec.md`): o que e por quê, sem tecnologia. Use `templates/spec.md`.
3. **Plano** (`specs/<feature>/plan.md`): como, com as zonas e os arquivos afetados. Use `templates/plan.md`.
4. **Tarefas** (`specs/<feature>/tasks.md`): passos pequenos e verificáveis. Use `templates/tasks.md`.
5. **Implementar** só depois que a spec e o plano estiverem aprovados.

Cada feature ganha uma pasta própria em `specs/`, com nome em kebab-case, por exemplo `specs/checkout/`.

Specs marcadas como "Retroativa" documentam features que já existiam antes do kit.
