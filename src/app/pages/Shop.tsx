import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

export function Shop() {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const getQuantity = (productId: number) => quantities[productId] || 1;

  const incrementQuantity = (productId: number, maxStock: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.min((prev[productId] || 1) + 1, maxStock),
    }));
  };

  const decrementQuantity = (productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) - 1, 1),
    }));
  };

  const handleAddToCart = (product: any) => {
    const quantity = getQuantity(product.id);
    addToCart(product, quantity);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 text-emerald-900 font-serif">Ventas al Público</h1>
          <p className="text-xl text-gray-700">
            Todos nuestros productos certificados disponibles para entrega inmediata
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const quantity = getQuantity(product.id);
            const isAdded = addedToCart === product.id;

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-amber-200 hover:shadow-xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-800 text-white px-3 py-1 rounded-full text-sm">
                    Stock: {product.stock}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl mb-2 text-emerald-900 font-serif">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-3xl text-emerald-700 font-serif">
                      ${product.price.toLocaleString('es-AR')}
                    </p>
                    <p className="text-sm text-gray-500">por bolsa de 25kg</p>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-gray-700">Cantidad:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrementQuantity(product.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded p-1 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold">{quantity}</span>
                      <button
                        onClick={() => incrementQuantity(product.id, product.stock)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded p-1 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full py-3 rounded flex items-center justify-center gap-2 transition-colors ${
                      product.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : isAdded
                        ? 'bg-green-600 text-white'
                        : 'bg-emerald-700 text-white hover:bg-emerald-800'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.stock === 0
                      ? 'Sin Stock'
                      : isAdded
                      ? '¡Agregado!'
                      : 'Agregar al Carrito'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
