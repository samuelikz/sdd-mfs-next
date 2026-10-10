'use server';

import { addItemToCart } from '@feedme/shared/cart';
import { findRestaurant } from '../lib/catalog';

/**
 * Server Action chamada pelo botão "Adicionar". Roda no servidor da zona de pedidos.
 * Confere o id e o índice com o próprio catálogo antes de gravar, então nada inválido entra no carrinho.
 */
export async function addToCart(restaurantId: string, itemIndex: number) {
  const restaurant = findRestaurant(restaurantId);
  if (!restaurant || !restaurant.items[itemIndex]) return false;

  return addItemToCart(restaurant.id, itemIndex);
}
