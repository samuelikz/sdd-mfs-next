import { ArrowLeft, Star } from 'lucide-react';
import { formatBRL } from '@feedme/shared/format';
import { findRestaurant } from '@feedme/shared/restaurants';
import { notFound } from 'next/navigation';
import { AddButton } from '../../add-button';

/** Zona "RestaurantOrder": cardápio e pedido de um restaurante. O id vem da URL. */
export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurant = findRestaurant(id);
  if (!restaurant) notFound();

  const Icon = restaurant.icon;

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
