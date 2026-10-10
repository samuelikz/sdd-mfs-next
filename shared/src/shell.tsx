import { readCart } from './cart';
import { Header } from './header';
import './tokens.css';

/**
 * Casca comum a todas as zonas: html, header, área principal e footer.
 * É async porque lê o carrinho no servidor para mostrar o contador já na primeira resposta.
 */
export async function Shell({ children }: { children: React.ReactNode }) {
  const cart = await readCart();

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
        <Header cartCount={cart.length} />
        <main className="container-main">{children}</main>
        <footer className="container-footer">Feed me · exemplo de micro frontends com Next.js</footer>
      </body>
    </html>
  );
}
