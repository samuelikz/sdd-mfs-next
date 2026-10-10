'use client';

import { Check, Plus } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { addToCart } from './actions';

/** Tempo, em milissegundos, que o botão mostra "Adicionado". */
const FEEDBACK_DURATION_MS = 1200;

/**
 * Chama a Server Action só com o id do restaurante e o índice do item.
 * Nome e preço são lidos do catálogo no servidor, nunca vêm do cliente.
 */
export function AddButton({ restaurantId, itemIndex, itemName }: {
  restaurantId: number;
  itemIndex: number;
  itemName: string;
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isAdded) return;
    const timer = setTimeout(() => setIsAdded(false), FEEDBACK_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isAdded]);

  const handleClick = () => {
    startTransition(async () => {
      setIsAdded(await addToCart(String(restaurantId), itemIndex));
    });
  };

  const Icon = isAdded ? Check : Plus;

  return (
    <button
      type="button"
      className={`restaurant-order_add${isAdded ? ' is-done' : ''}`}
      aria-label={`Adicionar ${itemName} ao carrinho`}
      disabled={isPending}
      onClick={handleClick}
    >
      <Icon size={16} aria-hidden="true" />
      {isAdded ? 'Adicionado' : 'Adicionar'}
    </button>
  );
}
