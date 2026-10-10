'use server';

import { readStoredItems, writeStoredItems } from '@feedme/shared/cart';
import { fetchCatalog } from '@feedme/shared/catalog';
import { resolveEntries } from './cart-entries';

/**
 * Server Action chamada pelo botão "Remover" de cada linha do carrinho.
 * Usa a mesma lista resolvida que a página mostra, então a posição indica a linha certa.
 */
export async function removeFromCart(index: number) {
  const entries = resolveEntries(await readStoredItems(), await fetchCatalog());
  if (!Number.isInteger(index) || index < 0 || index >= entries.length) return false;

  await writeStoredItems(entries.filter((_, position) => position !== index).map((entry) => entry.stored));
  return true;
}
