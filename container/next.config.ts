import type { NextConfig } from 'next';

/**
 * CONTAINER: a zona principal, dona do domínio.
 *
 * Não renderiza páginas. Encaminha cada rota, e os assets da zona dona, para a zona certa.
 * As URLs vêm de variáveis de ambiente, então mudam por ambiente sem mexer no código.
 */
const ZONES = [
  {
    name: 'browse',
    url: process.env.BROWSE_URL ?? 'http://localhost:3001',
    routes: ['/'],
  },
  {
    name: 'restaurant-order',
    url: process.env.RESTAURANT_ORDER_URL ?? 'http://localhost:3002',
    routes: ['/restaurant/:id'],
  },
  {
    name: 'user-profile',
    url: process.env.USER_PROFILE_URL ?? 'http://localhost:3003',
    routes: ['/user-profile'],
  },
];

/** Rewrites para as rotas de cada zona e para os assets em <zona>-static/. */
const zoneRewrites = (zone: (typeof ZONES)[number]) => [
  ...zone.routes.map((route) => ({ source: route, destination: `${zone.url}${route}` })),
  {
    source: `/${zone.name}-static/:path+`,
    destination: `${zone.url}/${zone.name}-static/:path+`,
  },
];

const nextConfig: NextConfig = {
  rewrites: async () => ZONES.flatMap(zoneRewrites),
};

export default nextConfig;
