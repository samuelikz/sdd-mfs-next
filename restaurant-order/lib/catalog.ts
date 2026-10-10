import type { CatalogRestaurant } from '@feedme/shared/catalog';

/**
 * Catálogo de restaurantes. Esta zona é a dona dos dados: outras zonas leem pela API GET /api/restaurants.
 */
export const RESTAURANTS: CatalogRestaurant[] = [
  {
    id: 1,
    name: 'Burger Palace',
    cuisine: 'Hambúrguer',
    iconName: 'beef',
    color: '#ffe2c6',
    rating: 4.7,
    time: '25-35',
    tagline: 'Hambúrguer artesanal',
    items: [
      { name: 'X-Burger', price: 28, description: 'Pão brioche, blend 160g, queijo' },
      { name: 'X-Bacon', price: 32, description: 'Bacon crocante e cheddar' },
      { name: 'Batata frita', price: 15, description: 'Porção média com páprica' },
    ],
  },
  {
    id: 2,
    name: 'Sushi Zen',
    cuisine: 'Japonesa',
    iconName: 'fish',
    color: '#ffd9df',
    rating: 4.9,
    time: '35-45',
    tagline: 'Culinária japonesa',
    items: [
      { name: 'Combo 20 peças', price: 79, description: 'Sashimi, niguiri e uramaki' },
      { name: 'Temaki salmão', price: 34, description: 'Salmão fresco e cebolinha' },
      { name: 'Missoshiru', price: 12, description: 'Sopa de missô tradicional' },
    ],
  },
  {
    id: 3,
    name: 'Cantina da Nonna',
    cuisine: 'Italiana',
    iconName: 'pizza',
    color: '#fff0b8',
    rating: 4.6,
    time: '30-40',
    tagline: 'Cozinha italiana',
    items: [
      { name: 'Lasanha', price: 52, description: 'Bolonhesa, bechamel e parmesão' },
      { name: 'Spaghetti', price: 45, description: 'Ao sugo com manjericão' },
      { name: 'Tiramisù', price: 22, description: 'Receita da nonna' },
    ],
  },
  {
    id: 4,
    name: 'Taco Loco',
    cuisine: 'Mexicana',
    iconName: 'sandwich',
    color: '#d7f2d0',
    rating: 4.5,
    time: '20-30',
    tagline: 'Comida mexicana',
    items: [
      { name: 'Tacos (3)', price: 36, description: 'Carne, pico de gallo e guacamole' },
      { name: 'Burrito', price: 39, description: 'Frango, feijão e arroz' },
      { name: 'Nachos', price: 27, description: 'Com cheddar e jalapeño' },
    ],
  },
];

/** Busca por id usando Map, e não objeto literal: chaves como "constructor" ou "toString" não viram restaurante. */
const RESTAURANTS_BY_ID = new Map(RESTAURANTS.map((restaurant) => [String(restaurant.id), restaurant]));

export function findRestaurant(id: string): CatalogRestaurant | undefined {
  return RESTAURANTS_BY_ID.get(id);
}
