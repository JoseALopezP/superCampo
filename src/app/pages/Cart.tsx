import { useCart } from '../context/CartContext';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

export function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setOrderPlaced(false);
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-12 text-center max-w-md border-4 border-emerald-700">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl text-emerald-900 font-serif mb-4">¡Pedido Confirmado!</h2>
          <p className="text-gray-700 mb-2">
            Su orden ha sido recibida exitosamente.
          </p>
          <p className="text-gray-600 text-sm">
            Nos pondremos en contacto a la brevedad para coordinar el envío.
          </p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl text-emerald-900 font-serif mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            Agrega productos desde nuestra sección de ventas
          </p>
          <Link
            to="/ventas"
            className="inline-block bg-emerald-700 text-white px-8 py-3 rounded hover:bg-emerald-800 transition-colors"
          >
            Ir a Ventas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl mb-8 text-emerald-900 font-serif">Tu Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-200"
              >
                <div className="flex gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-2xl text-emerald-900 font-serif mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded p-2 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-bold w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className={`rounded p-2 transition-colors ${
                            item.quantity >= item.stock
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-gray-500 ml-2">
                          (Disponible: {item.stock})
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-4 text-right">
                      <p className="text-sm text-gray-600">
                        ${item.price.toLocaleString('es-AR')} x {item.quantity}
                      </p>
                      <p className="text-2xl text-emerald-700 font-serif">
                        ${(item.price * item.quantity).toLocaleString('es-AR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-emerald-200 sticky top-24">
              <h2 className="text-2xl text-emerald-900 font-serif mb-6">Resumen del Pedido</h2>

              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-gray-900">
                      ${(item.price * item.quantity).toLocaleString('es-AR')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-emerald-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="text-gray-900">
                    ${getTotalPrice().toLocaleString('es-AR')}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-700">Envío:</span>
                  <span className="text-green-600">A calcular</span>
                </div>
                <div className="flex justify-between text-xl">
                  <span className="font-serif text-emerald-900">Total:</span>
                  <span className="text-emerald-700 font-serif">
                    ${getTotalPrice().toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-emerald-700 text-white py-4 rounded hover:bg-emerald-800 transition-colors mb-4 text-lg"
              >
                Finalizar Compra
              </button>

              <Link
                to="/ventas"
                className="block text-center text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
