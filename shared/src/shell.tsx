import { Suspense } from 'react';
import { readCart } from './cart';
import { Header } from './header';
import './tokens.css';

/**
 * Lê o carrinho no servidor e entrega o contador do cabeçalho.
 * Fica em Suspense porque o cookie só existe por requisição, então não entra na casca pré-renderizada.
 */
async function CartHeader() {
  const cart = await readCart();
  return <Header cartCount={cart.length} />;
}

/**
 * Casca comum a todas as zonas: html, header, área principal e footer.
 * O contador do cabeçalho chega em streaming, então a casca fica pré-renderizada.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap"
        />
      </head>
      <body>
        <Suspense fallback={<Header cartCount={null} />}>
          <CartHeader />
        </Suspense>
        <main className="container-main">{children}</main>
        <footer className="container-footer">Feed me · exemplo de micro frontends com Next.js</footer>
      </body>
    </html>
  );
}
