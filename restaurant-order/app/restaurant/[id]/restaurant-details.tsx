import { ArrowLeft, Beef, Fish, LucideIcon, Pizza, Sandwich, Star } from 'lucide-react';
import { cacheLife } from 'next/cache';
import type { RestaurantIconName } from '@feedme/shared/catalog';
import { formatBRL } from '@feedme/shared/format';
import { findRestaurant } from '../../../lib/catalog';
import { AddButton } from '../../add-button';

/** Ícone de cada restaurante. O catálogo guarda só o nome, porque componentes não viajam pela API. */
const ICONS: Record<RestaurantIconName, LucideIcon> = {
  beef: Beef,
  fish: Fish,
  pizza: Pizza,
  sandwich: Sandwich,
};

/**
 * Cardápio de um restaurante. O catálogo é fixo, então o resultado fica em cache.
 * Recebe só o id (string), porque argumentos de `use cache` precisam ser serializáveis.
 * O carrinho não entra aqui: o botão "Adicionar" só envia o id e o índice.
 */
export async function RestaurantDetails({ id }: { id: string }) {
  'use cache';
  cacheLife('max');

  const restaurant = findRestaurant(id);
  if (!restaurant) return null;

  const Icon = ICONS[restaurant.iconName];

  return (
    <>
      {/* <a> e não <Link>: "/" pertence à zona Browse. */}
      <a href="/" className="restaurant-order_back">
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar
      </a>

      <section className="restaurant-order_hero" style={{ background: restaurant.color }}>
        <div className="restaurant-order_icon" aria-hidden="true">
          <Icon size={72} strokeWidth={1.5} />
        </div>
        <div>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.tagline}</p>
          <p className="restaurant-order_rating">
            <Star size={14} fill="currentColor" aria-hidden="true" />
            {restaurant.rating}
          </p>
        </div>
      </section>

      <h3 className="restaurant-order_title">Cardápio</h3>
      <div className="restaurant-order_menu">
        {restaurant.items.map((item, index) => (
          <div key={item.name} className="restaurant-order_item">
            <div>
              <div className="restaurant-order_name">{item.name}</div>
              <div className="restaurant-order_desc">{item.description}</div>
              <div className="restaurant-order_price">{formatBRL(item.price)}</div>
            </div>
            <AddButton restaurantId={restaurant.id} itemIndex={index} itemName={item.name} />
          </div>
        ))}
      </div>
    </>
  );
}
