import { ShoppingCart, User } from 'lucide-react';
import { readCart } from '@feedme/shared/cart';
import { formatBRL } from '@feedme/shared/format';

/** Texto no singular ou plural conforme a quantidade. Ex.: "1 item", "3 itens". */
const pluralizeItems = (count: number) => `${count} ${count === 1 ? 'item' : 'itens'}`;

/**
 * Zona "UserProfile": perfil e carrinho.
 * Server Component: lê o carrinho do cookie e já entrega a página com o total calculado.
 */
export default async function UserProfilePage() {
  const cart = await readCart();
  const total = cart.reduce((sum, order) => sum + order.price * order.quantity, 0);

  return (
    <div className="user-profile_grid">
      <aside className="user-profile_card">
        <div className="user-profile_avatar" aria-hidden="true">
          <User size={36} />
        </div>
        <h2>Olá, cliente!</h2>
        <p className="user-profile_muted">Membro desde 2024</p>
        <p className="user-profile_muted">{pluralizeItems(cart.length)} no carrinho</p>
      </aside>

      <section className="user-profile_card">
        <h3>Seu carrinho</h3>
        {cart.length ? (
          <>
            {cart.map((order, index) => (
              <div key={index} className="user-profile_row">
                <div>
                  <strong>{order.item}</strong>
                  <p className="user-profile_muted">{order.restaurant}</p>
                </div>
                <span>{formatBRL(order.price)}</span>
              </div>
            ))}
            <div className="user-profile_total">
              <span>Total</span>
              <span>{formatBRL(total)}</span>
            </div>
          </>
        ) : (
          <div className="user-profile_empty">
            <ShoppingCart size={48} strokeWidth={1.5} aria-hidden="true" />
            <p>Seu carrinho está vazio.</p>
          </div>
        )}
      </section>
    </div>
  );
}
