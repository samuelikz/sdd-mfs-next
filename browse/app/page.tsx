import { cacheLife } from 'next/cache';
import { fetchCatalog } from '@feedme/shared/catalog';
import { RestaurantList } from './restaurant-list';

/**
 * Catálogo vindo da zona de pedidos. Fica em cache: os dados mudam raramente.
 * Chamada pela página, então o cache não depende de nenhum dado da requisição.
 */
async function cachedCatalog() {
  'use cache';
  cacheLife('max');
  return fetchCatalog();
}

/** Zona "Browse": busca e filtro de restaurantes. */
export default async function BrowsePage() {
  const restaurants = await cachedCatalog();
  return <RestaurantList restaurants={restaurants} />;
}
