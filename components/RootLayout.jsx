import { Outlet } from 'next/navigation';
import { Navigation } from './Navigation';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Outlet />
    </div>
  );
}
