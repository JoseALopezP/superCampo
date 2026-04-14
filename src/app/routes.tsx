import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Admin } from './pages/Admin';
import { Cart } from './pages/Cart';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'ventas', Component: Shop },
      { path: 'admin', Component: Admin },
      { path: 'carrito', Component: Cart },
    ],
  },
]);
