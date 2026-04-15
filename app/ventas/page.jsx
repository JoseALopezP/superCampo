"use client";
import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

export default function Shop() {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [addedToCart, setAddedToCart] = useState(null);

  const getQuantity = (productId) => quantities[productId] || 1;

  const incrementQuantity = (productId, maxStock) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.min((prev[productId] || 1) + 1, maxStock),
    }));
  };

  const decrementQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) - 1, 1),
    }));
  };

  const handleAddToCart = (product) => {
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
          <p className="text-xl text-gray-700">Productos certificados disponibles</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const quantity = getQuantity(product.id);
            const isAdded = addedToCart === product.id;
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-lg border-2 border-amber-200">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl text-emerald-900 font-serif">{product.name}</h3>
                  <p className="text-3xl text-emerald-700">${product.price.toLocaleString('es-AR')}</p>
                  <div className="flex items-center gap-4 my-4">
                    <button onClick={() => decrementQuantity(product.id)} className="p-1 bg-gray-200 rounded"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold">{quantity}</span>
                    <button onClick={() => incrementQuantity(product.id, product.stock)} className="p-1 bg-gray-200 rounded"><Plus className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => handleAddToCart(product)} disabled={product.stock === 0} className="w-full py-3 bg-emerald-700 text-white rounded">
                    {product.stock === 0 ? 'Sin Stock' : isAdded ? '¡Agregado!' : 'Agregar al Carrito'}
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
