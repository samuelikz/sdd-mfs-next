import type { Metadata } from 'next';

/** Metadados comuns a todas as zonas. Cada layout reexporta este objeto como `metadata`. */
export const FEEDME_METADATA: Metadata = {
  title: 'Feed me',
  description: 'Feed me: exemplo de aplicação com micro frontends.',
};
