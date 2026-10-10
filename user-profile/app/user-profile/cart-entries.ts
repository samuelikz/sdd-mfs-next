import type { StoredItem } from '@feedme/shared/cart';
import type { CatalogRestaurant } from '@feedme/shared/catalog';

/** Item do carrinho com nome e preço vindos do catálogo da zona de pedidos. */
export type Order = {
  restaurant: string;
  item: string;
  price: number;
  quantity: number;
};

/** Linha do carrinho: o item gravado no cookie e o pedido resolvido. Ficam na mesma posição. */
export type CartEntry = {
  stored: StoredItem;
  order: Order;
};

/**
 * Resolve os itens gravados pelo catálogo. Item que o catálogo não reconhece é descartado.
 * A página e a remoção usam esta mesma lista, então a posição mostrada é a posição removida.
 */
export function resolveEntries(stored: StoredItem[], catalog: CatalogRestaurant[]): CartEntry[] {
  const restaurants = new Map(catalog.map((restaurant) => [restaurant.id, restaurant]));

  return stored.flatMap((item) => {
    const restaurant = restaurants.get(item.restaurantId);
    const menuItem = restaurant?.items[item.itemIndex];
    if (!restaurant || !menuItem) return [];

    return [
      {
        stored: item,
        order: { restaurant: restaurant.name, item: menuItem.name, price: menuItem.price, quantity: 1 },
      },
    ];
  });
}
