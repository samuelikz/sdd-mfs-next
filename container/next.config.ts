import type { NextConfig } from 'next';
import zones from '../zones.json';

/**
 * CONTAINER: a zona principal, dona do domínio.
 *
 * Não renderiza páginas. Encaminha cada rota, e os assets da zona dona, para a zona certa.
 * As zonas vêm de zones.json. Cada URL pode ser trocada por variável de ambiente,
 * por exemplo BROWSE_URL, então muda por ambiente sem mexer no código.
 */
const ZONES = zones.map((zone) => {
  const envVar = `${zone.name.toUpperCase().replace(/-/g, '_')}_URL`;
  return { ...zone, url: process.env[envVar] ?? `http://localhost:${zone.port}` };
});

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
  transpilePackages: ['@feedme/shared'],
};

export default nextConfig;
