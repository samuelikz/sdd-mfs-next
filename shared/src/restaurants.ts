import { Beef, Fish, LucideIcon, Pizza, Sandwich } from 'lucide-react';

/**
 * Fonte única dos restaurantes, usada pela zona de busca e pela de pedidos.
 * Num cenário real, estes dados viriam do backend (BFF) de um time dono.
 */

export type MenuItem = { name: string; price: number; description: string };

export type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  icon: LucideIcon;
  color: string;
  rating: number;
  time: string;
  tagline: string;
  items: MenuItem[];
};

export const RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: 'Burger Palace',
    cuisine: 'Hambúrguer',
    icon: Beef,
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
    icon: Fish,
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
    icon: Pizza,
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
    icon: Sandwich,
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

/**
 * Busca por id usando Map, e não objeto literal: chaves como "constructor"
 * ou "toString" não existem no Map, então não viram restaurante por engano.
 */
const RESTAURANTS_BY_ID = new Map(RESTAURANTS.map((restaurant) => [String(restaurant.id), restaurant]));

export function findRestaurant(id: string): Restaurant | undefined {
  return RESTAURANTS_BY_ID.get(id);
}
