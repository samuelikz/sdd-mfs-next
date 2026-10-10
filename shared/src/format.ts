/** Formata um número como moeda brasileira. Ex.: 28 vira "R$ 28,00". */
export const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
