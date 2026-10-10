'use client';

import { ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { usePathname } from 'next/navigation';

/** Links do menu. Usam <a> e não <Link>, porque cada rota pode ser de outra zona. */
const NAV_LINKS = [
  { href: '/', label: 'Restaurantes' },
  { href: '/random', label: 'Surpreenda-me' },
  { href: '/user-profile', label: 'Perfil' },
];

/** Diz se o link corresponde à rota atual. Restaurantes também cobre /restaurant/:id. */
const isActiveLink = (href: string, path: string) =>
  href === path || (href === '/' && path.startsWith('/restaurant'));

/**
 * Header comum a todas as zonas: logo, navegação e contador do carrinho.
 * O contador chega do servidor em streaming (via Shell). Enquanto carrega, fica vazio, sem mostrar um "0" falso.
 */
export function Header({ cartCount }: { cartCount: number | null }) {
  const path = usePathname();

  return (
    <header className="container-header">
      <div className="container-header_inner">
        <a href="/" className="container-header_logo">
          <UtensilsCrossed size={22} aria-hidden="true" />
          Feed me
        </a>

        <nav className="container-header_nav" aria-label="Navegação principal">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = isActiveLink(href, path);
            return (
              <a
                key={href}
                href={href}
                className={isActive ? 'is-active' : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <a href="/user-profile" className="container-header_cart" aria-label={cartCount === null ? 'Ver carrinho' : `Ver carrinho, ${cartCount} itens`}>
          <ShoppingCart size={18} aria-hidden="true" />
          <span aria-live="polite">{cartCount ?? ''}</span>
        </a>
      </div>
    </header>
  );
}
