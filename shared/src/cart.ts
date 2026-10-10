import { cookies } from 'next/headers';
import { findRestaurant } from './restaurants';

/**
 * Carrinho guardado em cookie, lido pelo servidor.
 *
 * Cookies são por host e não por porta, então todas as zonas (servidas pelo container)
 * enxergam o mesmo carrinho. Como o servidor lê o cookie, a página já nasce com o total
 * certo, sem flash de carrinho vazio.
 *
 * O cookie guarda só o id do restaurante e o índice do item. Nome e preço são sempre
 * lidos do catálogo, então editar o cookie não muda o preço cobrado.
 */

const CART_COOKIE = 'feedme_cart';

/** Limite de itens. Mantém o cookie abaixo do limite de 4 KB dos navegadores. */
const MAX_CART_ITEMS = 50;

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24;

/** Forma gravada no cookie. Não contém preço. */
type StoredItem = {
  restaurantId: number;
  itemIndex: number;
};

/** Item do carrinho já resolvido pelo catálogo. É o que as telas usam. */
export type Order = {
  restaurant: string;
  item: string;
  price: number;
  quantity: number;
};

/** Valida um item lido do cookie. Cookie adulterado ou antigo é descartado. */
function isStoredItem(value: unknown): value is StoredItem {
  if (typeof value !== 'object' || value === null) return false;
  const stored = value as Record<string, unknown>;
  return typeof stored.restaurantId === 'number' && typeof stored.itemIndex === 'number';
}

/** Converte um item gravado em pedido, consultando o catálogo. Item inexistente vira null. */
function resolveItem({ restaurantId, itemIndex }: StoredItem): Order | null {
  const restaurant = findRestaurant(String(restaurantId));
  const item = restaurant?.items[itemIndex];
  if (!restaurant || !item) return null;

  return { restaurant: restaurant.name, item: item.name, price: item.price, quantity: 1 };
}

/** Lê os itens gravados no cookie, sem resolver preços. Dados inválidos viram lista vazia. */
async function readStoredItems(): Promise<StoredItem[]> {
  const raw = (await cookies()).get(CART_COOKIE)?.value;
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));
    return Array.isArray(parsed) ? parsed.filter(isStoredItem) : [];
  } catch {
    return [];
  }
}

/** Lê o carrinho da requisição atual, com nome e preço vindos do catálogo. */
export async function readCart(): Promise<Order[]> {
  const orders = await readStoredItems();
  return orders.map(resolveItem).filter((order): order is Order => order !== null);
}

/**
 * Adiciona um item ao carrinho. Só o id e o índice são gravados, então o preço
 * nunca sai do catálogo do servidor.
 */
export async function addItemToCart(restaurantId: string, itemIndex: number): Promise<boolean> {
  const restaurant = findRestaurant(restaurantId);
  if (!restaurant || !restaurant.items[itemIndex]) return false;

  const cartItems = await readStoredItems();
  if (cartItems.length >= MAX_CART_ITEMS) return false;

  const updated: StoredItem[] = [...cartItems, { restaurantId: restaurant.id, itemIndex }];

  (await cookies()).set(CART_COOKIE, encodeURIComponent(JSON.stringify(updated)), {
    path: '/',
    maxAge: COOKIE_MAX_AGE_SECONDS,
    sameSite: 'lax',
    httpOnly: true,
  });
  return true;
}
