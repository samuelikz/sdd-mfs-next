import { RESTAURANTS } from '../../../lib/catalog';

/** Catálogo público da zona de pedidos. Consumido por browse, user-profile e container. */
export function GET() {
  return Response.json(RESTAURANTS);
}
