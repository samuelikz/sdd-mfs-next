'use server';

import { removeItemFromCart } from '@feedme/shared/cart';
import { revalidatePath } from 'next/cache';

/**
 * Server Action chamada pelo botão "Remover" de cada linha do carrinho.
 * revalidatePath com 'layout' refaz também o header, que mostra o contador do carrinho.
 */
export async function removeFromCart(index: number) {
  const removed = await removeItemFromCart(index);
  if (removed) revalidatePath('/', 'layout');
  return removed;
}
