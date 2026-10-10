import { NextResponse } from 'next/server';

/** Quantidade de restaurantes disponíveis para o "Surpreenda-me". */
const TOTAL_RESTAURANTS = 4;

/** "Surpreenda-me": o container sorteia um restaurante e redireciona para a zona de pedidos. */
export function GET(request: Request) {
  const restaurantId = 1 + Math.floor(Math.random() * TOTAL_RESTAURANTS);
  return NextResponse.redirect(new URL(`/restaurant/${restaurantId}`, request.url));
}
