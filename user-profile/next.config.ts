import type { NextConfig } from 'next';

/**
 * Zona "user-profile". O assetPrefix separa os arquivos desta zona (/_next/...)
 * dos das outras, para o container saber para onde encaminhar cada um.
 *
 * Sem cacheComponents: o perfil lê o cookie do carrinho em cada requisição, então não tem o que cachear.
 * Com Cache Components, o conteúdo em Suspense ficava preso em "Carregando carrinho…" no dev.
 */
const nextConfig: NextConfig = {
  assetPrefix: '/user-profile-static',
  transpilePackages: ['@feedme/shared'],
};

export default nextConfig;
