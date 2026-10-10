import type { NextConfig } from 'next';

/**
 * Zona "user-profile". O assetPrefix separa os arquivos desta zona (/_next/...)
 * dos das outras, para o container saber para onde encaminhar cada um.
 */
const nextConfig: NextConfig = {
  assetPrefix: '/user-profile-static',
  transpilePackages: ['@feedme/shared'],
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
