import { Shell } from '@feedme/shared/shell';
import './styles.css';

export const metadata = {
  title: 'Feed me',
  description: 'Feed me: exemplo de aplicação com micro frontends.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
