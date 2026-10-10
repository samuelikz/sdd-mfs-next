import { FEEDME_METADATA } from '@feedme/shared/metadata';
import { Shell } from '@feedme/shared/shell';
import './styles.css';

export const metadata = FEEDME_METADATA;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
