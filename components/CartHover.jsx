import { useCart } from '@/context/CartContext';
import { X } from 'lucide-react';
import Link from 'next/link';

export function CartHover() {
  const { cart, removeFromCart, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-2xl border-2 border-emerald-200 p-6 z-50">
        <p className="text-gray-500 text-center">El carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border-2 border-emerald-200 z-50 max-h-[500px] overflow-y-auto">
      <div className="p-4">
        <h3 className="text-lg font-serif text-emerald-900 mb-4">Tu Carrito</h3>
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-sm text-emerald-900">{item.name}</h4>
                <p className="text-xs text-gray-600">
                  {item.quantity} x ${item.price.toLocaleString('es-AR')}
                </p>
                <p className="text-sm text-emerald-700">
                  ${(item.price * item.quantity).toLocaleString('es-AR')}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t-2 border-emerald-200">
          <div className="flex justify-between mb-4">
            <span className="font-serif text-emerald-900">Total:</span>
            <span className="text-lg text-emerald-700">
              ${getTotalPrice().toLocaleString('es-AR')}
            </span>
          </div>
          <Link
            href="/carrito"
            className="block w-full bg-emerald-700 text-white text-center py-3 rounded hover:bg-emerald-800 transition-colors"
          >
            Ver Carrito Completo
          </Link>
        </div>
      </div>
    </div>
  );
}
