'use server';

import { addItemToCart } from '@feedme/shared/cart';

/**
 * Server Action chamada pelo botão "Adicionar". Roda no servidor da zona de pedidos.
 * A revalidação do cabeçalho fica em `addItemToCart`.
 */
export async function addToCart(restaurantId: string, itemIndex: number) {
  return addItemToCart(restaurantId, itemIndex);
}
