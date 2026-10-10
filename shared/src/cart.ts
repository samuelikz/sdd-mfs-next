import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

/**
 * Contrato do carrinho: o cookie `feedme_cart` guarda uma lista de `{ restaurantId, itemIndex }`.
 *
 * Cookies são por host e não por porta, então todas as zonas enxergam o mesmo carrinho.
 * Este módulo só lê e grava o contrato. Não conhece catálogo nem preço: cada zona que precisa
 * de nome e preço resolve os ids pelo catálogo da zona de pedidos (ver catalog.ts).
 */

const CART_COOKIE = 'feedme_cart';

/** Limite de itens. Mantém o cookie abaixo do limite de 4 KB dos navegadores. */
const MAX_CART_ITEMS = 50;

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24;

/** Forma gravada no cookie. Não contém preço. */
export type StoredItem = {
  restaurantId: number;
  itemIndex: number;
};

/** Valida um item lido do cookie. Cookie adulterado ou antigo é descartado. */
function isStoredItem(value: unknown): value is StoredItem {
  if (typeof value !== 'object' || value === null) return false;
  const stored = value as Record<string, unknown>;
  return typeof stored.restaurantId === 'number' && typeof stored.itemIndex === 'number';
}

/** Lê os itens gravados no cookie da requisição atual. Dados inválidos viram lista vazia. */
export async function readStoredItems(): Promise<StoredItem[]> {
  const raw = (await cookies()).get(CART_COOKIE)?.value;
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));
    return Array.isArray(parsed) ? parsed.filter(isStoredItem) : [];
  } catch {
    return [];
  }
}

/** Grava a lista no cookie e refaz o layout compartilhado, onde fica o contador do cabeçalho. */
export async function writeStoredItems(items: StoredItem[]) {
  (await cookies()).set(CART_COOKIE, encodeURIComponent(JSON.stringify(items)), {
    path: '/',
    maxAge: COOKIE_MAX_AGE_SECONDS,
    sameSite: 'lax',
    httpOnly: true,
  });
  revalidatePath('/', 'layout');
}

/**
 * Acrescenta um item ao fim do carrinho. A zona que chama é quem confere se o item existe no catálogo.
 * Retorna falso quando o carrinho está cheio.
 */
export async function addItemToCart(restaurantId: number, itemIndex: number): Promise<boolean> {
  const items = await readStoredItems();
  if (items.length >= MAX_CART_ITEMS) return false;

  await writeStoredItems([...items, { restaurantId, itemIndex }]);
  return true;
}
