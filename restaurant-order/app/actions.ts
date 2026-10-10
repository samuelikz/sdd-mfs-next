'use server';

import { addItemToCart } from '@feedme/shared/cart';
import { revalidatePath } from 'next/cache';

/**
 * Server Action chamada pelo botão "Adicionar". Roda no servidor da zona de pedidos.
 * revalidatePath com 'layout' refaz também o header, que mostra o contador do carrinho.
 */
export async function addToCart(restaurantId: string, itemIndex: number) {
  const added = await addItemToCart(restaurantId, itemIndex);
  if (added) revalidatePath('/', 'layout');
  return added;
}
