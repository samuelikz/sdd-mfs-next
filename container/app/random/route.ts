import { fetchCatalog } from '@feedme/shared/catalog';
import { NextResponse } from 'next/server';

/**
 * "Surpreenda-me": sorteia um restaurante do catálogo da zona de pedidos e redireciona para ele.
 * O container não guarda a lista de restaurantes, então um restaurante novo aparece sem mudar esta rota.
 */
export async function GET(request: Request) {
  const catalog = await fetchCatalog();
  const restaurant = catalog[Math.floor(Math.random() * catalog.length)];
  return NextResponse.redirect(new URL(`/restaurant/${restaurant.id}`, request.url));
}
