import { Sprout, Phone, Mail, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartHover } from './CartHover';

export function Navigation() {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const [showCartHover, setShowCartHover] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const showCartIcon = location.pathname === '/ventas' || location.pathname === '/carrito';

  return (
    <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Sprout className="w-10 h-10 text-amber-400" />
            <div>
              <h1 className="text-2xl text-white font-serif">Super Campo</h1>
              <p className="text-sm text-amber-200">Semillas Certificadas</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`hover:text-amber-300 transition-colors ${
                isActive('/') ? 'text-amber-300' : ''
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/ventas"
              className={`hover:text-amber-300 transition-colors ${
                isActive('/ventas') ? 'text-amber-300' : ''
              }`}
            >
              Ventas
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+54 11 4567-8900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@supercampo.com.ar</span>
              </div>
            </div>

            {showCartIcon && (
              <div
                className="relative"
                onMouseEnter={() => setShowCartHover(true)}
                onMouseLeave={() => setShowCartHover(false)}
              >
                <Link to="/carrito" className="relative">
                  <ShoppingCart className="w-6 h-6 text-amber-300" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-400 text-emerald-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                {showCartHover && <CartHover />}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
