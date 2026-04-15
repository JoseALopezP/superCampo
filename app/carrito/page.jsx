"use client";
import { useCart } from '@/context/CartContext';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setOrderPlaced(false);
    }, 3000);
  };

  if (orderPlaced) return <div>Pedido Confirmado!</div>;
  if (cart.length === 0) return <div>Carrito vacío <Link href="/ventas">Ir a Ventas</Link></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl mb-8">Tu Carrito</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-6 border-2 border-amber-200 flex gap-6">
              <img src={item.image} alt={item.name} className="w-32 h-32 object-cover" />
              <div className="flex-1">
                <h3 className="text-2xl">{item.name}</h3>
                <div className="flex items-center gap-4">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus /></button>
                  <button onClick={() => removeFromCart(item.id)}><Trash2 /></button>
                </div>
                <p className="text-2xl">${(item.price * item.quantity).toLocaleString('es-AR')}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
           <div className="p-8 bg-white border-2">
             <h2>Total: ${getTotalPrice().toLocaleString('es-AR')}</h2>
             <button onClick={handleCheckout} className="w-full bg-emerald-700 text-white py-4 mt-4">Comprar</button>
           </div>
        </div>
      </div>
    </div>
  );
}
