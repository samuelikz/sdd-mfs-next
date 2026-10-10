'use server';

import { removeItemFromCart } from '@feedme/shared/cart';

/**
 * Server Action chamada pelo botão "Remover" de cada linha do carrinho.
 * A revalidação do cabeçalho fica em `removeItemFromCart`.
 */
export async function removeFromCart(index: number) {
  return removeItemFromCart(index);
}
