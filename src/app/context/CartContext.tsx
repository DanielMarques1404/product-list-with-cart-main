import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { ProductType } from "../../types/types";

export type ProductsInCartType = {
  product: ProductType;
  qtd: number;
}

type CartContextType = {
  productsInCart: ProductsInCartType[];
  clearCart: (productName?: string) => void;
  addProductToCart: (product: ProductType) => void;
  removeProductFromCart: (productName: string) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [productsInCart, setProductsInCart] = useState<ProductsInCartType[]>([]);

  const addProductToCart = (product: ProductType) => {
    const p = productsInCart.find(p => p.product.name === product.name);
    if (p) {
      setProductsInCart(prev => prev.map(p => p.product.name === product.name ? { ...p, qtd: p.qtd + 1 } : p));
    } else {
      setProductsInCart(prev => [...prev, { product: product, qtd: 1 }]);
    }
  }

  const removeProductFromCart = (productName: string) => {
    const p = productsInCart.find(p => p.product.name === productName);
    if (p && p.qtd > 1) {
      setProductsInCart(prev => prev.map(p => p.product.name === productName ? { ...p, qtd: p.qtd - 1 } : p));
    } else {
      setProductsInCart(prev => prev.filter(p => p.product.name !== productName));
    }
  }

  const clearCart = (productName?: string) => {
    if (productName) {
      setProductsInCart(prev => prev.filter(p => p.product.name !== productName));
    } else {
      setProductsInCart([]);
    }
  }

  const value = {
    productsInCart,
    addProductToCart,
    removeProductFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
};
