"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase/config';

const initialProducts = [
  {
    id: 1,
    name: 'Semillas de Trigo',
    description: 'Variedades de alto rendimiento adaptadas al clima argentino.',
    price: 45000,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1683248892987-7b6181dfd718',
  }
];

const ProductContext = createContext(undefined);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);
  const [useFirebase, setUseFirebase] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: parseInt(doc.id) || doc.id,
          ...doc.data()
        }));

        if (productsData.length > 0) {
          setProducts(productsData);
        }
        setLoading(false);
      },
      (error) => {
        console.warn('Firebase no configurado, usando datos locales:', error.message);
        setUseFirebase(false);
        setProducts(initialProducts);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addProduct = async (product, imageFile) => {
    try {
      if (!useFirebase) {
        const newId = Math.max(...products.map(p => typeof p.id === 'number' ? p.id : 0), 0) + 1;
        setProducts((prev) => [...prev, { ...product, id: newId }]);
        return;
      }
      let imageUrl = product.image;
      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      await addDoc(collection(db, 'products'), { ...product, image: imageUrl });
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id, updates, imageFile) => {
    try {
      if (!useFirebase) {
        setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...updates } : p));
        return;
      }
      let updateData = { ...updates };
      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        updateData.image = await getDownloadURL(storageRef);
      }
      await updateDoc(doc(db, 'products', id.toString()), updateData);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      if (!useFirebase) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        return;
      }
      await deleteDoc(doc(db, 'products', id.toString()));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const refreshProducts = async () => {
    if (!useFirebase) return;
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      setProducts(snapshot.docs.map(doc => ({ id: parseInt(doc.id) || doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error refreshing products:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
}
