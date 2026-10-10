/**
 * Contrato do catálogo de restaurantes. Quem é dono dos dados é a zona de pedidos (restaurant-order),
 * que expõe o catálogo em GET /api/restaurants. Outras zonas leem por essa API e nunca importam os dados.
 */

export type RestaurantIconName = 'beef' | 'fish' | 'pizza' | 'sandwich';

export type MenuItem = { name: string; price: number; description: string };

/** Restaurante como trafega pela API: só dados, sem componentes (funções não são serializáveis). */
export type CatalogRestaurant = {
  id: number;
  name: string;
  cuisine: string;
  iconName: RestaurantIconName;
  color: string;
  rating: number;
  time: string;
  tagline: string;
  items: MenuItem[];
};

/** Caminho do catálogo na zona de pedidos. */
export const CATALOG_PATH = '/api/restaurants';

/** Endereço da zona de pedidos. Em produção, defina RESTAURANT_ORDER_URL. */
const restaurantOrderUrl = () => process.env.RESTAURANT_ORDER_URL ?? 'http://localhost:3002';

/** Busca o catálogo na zona de pedidos. Lança erro se a API não responder. */
export async function fetchCatalog(): Promise<CatalogRestaurant[]> {
  const response = await fetch(`${restaurantOrderUrl()}${CATALOG_PATH}`);
  if (!response.ok) throw new Error(`catálogo indisponível (${response.status})`);
  return response.json();
}
