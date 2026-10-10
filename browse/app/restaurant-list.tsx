'use client';

import { Search, SearchX, Star } from 'lucide-react';
import { RESTAURANTS } from '@feedme/shared/restaurants';
import { useState } from 'react';

/** Filtro que mostra todas as culinárias. */
const ALL_CUISINES = 'Todas';

const CUISINES = [ALL_CUISINES, ...new Set(RESTAURANTS.map((restaurant) => restaurant.cuisine))];

/** Busca, filtro por culinária e lista de restaurantes. */
export function RestaurantList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(ALL_CUISINES);

  const term = searchTerm.toLowerCase();
  const filtered = RESTAURANTS.filter((restaurant) => {
    const matchesCuisine = selectedCuisine === ALL_CUISINES || restaurant.cuisine === selectedCuisine;
    const matchesSearch = `${restaurant.name} ${restaurant.cuisine}`.toLowerCase().includes(term);
    return matchesCuisine && matchesSearch;
  });

  return (
    <>
      <section className="browse_hero">
        <h1>Com fome de quê hoje?</h1>
        <p>Os melhores restaurantes da cidade, entregues na sua porta.</p>
        <div className="browse_search">
          <Search className="browse_search-icon" size={18} aria-hidden="true" />
          <input
            className="browse_filter"
            type="search"
            aria-label="Buscar restaurante ou culinária"
            placeholder="Buscar restaurante ou culinária…"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </section>

      <div className="browse_chips" role="group" aria-label="Filtrar por culinária">
        {CUISINES.map((cuisine) => (
          <button
            key={cuisine}
            type="button"
            className={`browse_chip${cuisine === selectedCuisine ? ' is-active' : ''}`}
            aria-pressed={cuisine === selectedCuisine}
            onClick={() => setSelectedCuisine(cuisine)}
          >
            {cuisine}
          </button>
        ))}
      </div>

      <div className="browse_list">
        {filtered.length ? (
          filtered.map((restaurant) => {
            const Icon = restaurant.icon;
            return (
              // <a> e não <Link>: /restaurant/:id pertence a outra zona.
              <a
                key={restaurant.id}
                href={`/restaurant/${restaurant.id}`}
                className="browse_card"
                aria-label={`Abrir cardápio de ${restaurant.name}`}
              >
                <div className="browse_cover" style={{ background: restaurant.color }}>
                  <Icon size={56} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="browse_body">
                  <h3>{restaurant.name}</h3>
                  <div className="browse_meta">
                    <span className="browse_rating">
                      <Star size={14} fill="currentColor" aria-hidden="true" />
                      {restaurant.rating}
                    </span>
                    <span>{restaurant.cuisine}</span>
                    <span>{restaurant.time} min</span>
                  </div>
                </div>
              </a>
            );
          })
        ) : (
          <p className="browse_empty">
            <SearchX size={40} strokeWidth={1.5} aria-hidden="true" />
            Nenhum restaurante encontrado.
          </p>
        )}
      </div>
    </>
  );
}
