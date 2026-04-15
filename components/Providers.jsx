"use client";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";

export function Providers({ children }) {
  return (
    <ProductProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ProductProvider>
  );
}
