'use client';

import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { removeFromCart } from './actions';

/**
 * Chama a Server Action só com a posição da linha no carrinho.
 * O servidor confere a posição antes de remover.
 */
export function RemoveButton({ index, itemName }: { index: number; itemName: string }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await removeFromCart(index);
    });
  };

  return (
    <button
      type="button"
      className="user-profile_remove"
      aria-label={`Remover ${itemName} do carrinho`}
      disabled={isPending}
      onClick={handleClick}
    >
      <Trash2 size={16} aria-hidden="true" />
      Remover
    </button>
  );
}
