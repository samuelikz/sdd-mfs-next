import { RESTAURANTS, findRestaurant } from '@feedme/shared/restaurants';
import { notFound } from 'next/navigation';
import { RestaurantDetails } from './restaurant-details';

/**
 * A navegação para esta rota não é instantânea: o id precisa ser lido antes de renderizar,
 * para que um id inexistente responda 404 com o status certo.
 */
export const instant = false;

/** Pré-renderiza os restaurantes do catálogo. Ids fora dele são checados em tempo de requisição. */
export function generateStaticParams() {
  return RESTAURANTS.map((restaurant) => ({ id: String(restaurant.id) }));
}

/** Zona "RestaurantOrder": cardápio e pedido de um restaurante. O id vem da URL. */
export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!findRestaurant(id)) notFound();

  return <RestaurantDetails id={id} />;
}
