import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './CartContext';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Semillas de Trigo',
    description: 'Variedades de alto rendimiento adaptadas al clima argentino. Certificadas con excelente poder germinativo.',
    price: 45000,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1683248892987-7b6181dfd718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMHNlZWRzJTIwZ3JhaW58ZW58MXx8fHwxNzc0NDcxMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    name: 'Semillas de Maíz',
    description: 'Híbridos certificados con excelente sanidad. Alta resistencia a plagas y enfermedades.',
    price: 52000,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1635843107983-264f83647ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwc2VlZHMlMjBzb3liZWFufGVufDF8fHx8MTc3NDQ3MTMxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    name: 'Semillas de Girasol',
    description: 'Alta concentración de aceite y resistencia a enfermedades. Ideal para la región pampeana.',
    price: 38000,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1715865989413-d69314ac1902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5mbG93ZXIlMjBzZWVkcyUyMGFncmljdWx0dXJhbHxlbnwxfHx8fDE3NzQ0NzEzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    name: 'Semillas de Soja',
    description: 'Genética de última generación para máxima productividad. Resistencia a herbicidas.',
    price: 48000,
    stock: 180,
    image: 'https://images.unsplash.com/photo-1592864554447-5e40d96e2b21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBob2xkaW5nJTIwc2VlZHN8ZW58MXx8fHwxNzc0NDcxMzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 5,
    name: 'Semillas de Sorgo',
    description: 'Excelente opción para zonas con menor disponibilidad de agua. Alta tolerancia a sequía.',
    price: 35000,
    stock: 140,
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3JnaHVtJTIwZ3JhaW58ZW58MXx8fHwxNzc0NDcxMzE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 6,
    name: 'Semillas de Cebada',
    description: 'Variedades maltera y forrajera. Excelente adaptación a climas templados.',
    price: 42000,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJsZXklMjBncmFpbnxlbnwxfHx8fDE3NzQ0NzEzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>, imageFile?: File) => Promise<void>;
  updateProduct: (id: number, updates: Partial<Product>, imageFile?: File) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(true);
  const [useFirebase, setUseFirebase] = useState(true);

  useEffect(() => {
    // Intentar cargar desde Firebase, si falla usar datos locales
    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: parseInt(doc.id),
          ...doc.data()
        })) as Product[];

        if (productsData.length > 0) {
          setProducts(productsData);
        }
        setLoading(false);
      },
      (error) => {
        console.warn('Firebase no configurado o error de conexión, usando datos locales:', error.message);
        setUseFirebase(false);
        setProducts(initialProducts);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>, imageFile?: File) => {
    try {
      if (!useFirebase) {
        // Modo local
        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        setProducts((prev) => [...prev, { ...product, id: newId }]);
        return;
      }

      let imageUrl = product.image;

      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'products'), {
        ...product,
        image: imageUrl
      });
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  };

  const updateProduct = async (id: number, updates: Partial<Product>, imageFile?: File) => {
    try {
      if (!useFirebase) {
        // Modo local
        setProducts((prev) =>
          prev.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          )
        );
        return;
      }

      let updateData = { ...updates };

      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);
        updateData.image = imageUrl;
      }

      await updateDoc(doc(db, 'products', id.toString()), updateData);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      if (!useFirebase) {
        // Modo local
        setProducts((prev) => prev.filter((product) => product.id !== id));
        return;
      }

      await deleteDoc(doc(db, 'products', id.toString()));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  };

  const refreshProducts = async () => {
    if (!useFirebase) return;

    try {
      const snapshot = await getDocs(collection(db, 'products'));
      const productsData = snapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error('Error al refrescar productos:', error);
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
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
