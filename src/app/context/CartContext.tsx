import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { ProductType } from "../../types/types";

type ProductsInCartType = {
  product: ProductType;
  qtd: number;
}

type CartContextType = {
  productsInCart: ProductsInCartType[];
  addProductToCart: (productName: string) => void;
  removeProductFromCart: (productName: string) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [productsInCart, setProductsInCart] = useState<ProductsInCartType[]>([]);

  const addProductToCart = (productName: string) => {
    const p = productsInCart.find(p => p.product.name === productName);
    if (p) {
      setProductsInCart(prev => prev.map(p => p.product.name === productName ? { ...p, qtd: p.qtd + 1 } : p));
    } else {
      setProductsInCart(prev => [...prev, { product: { name: productName } as ProductType, qtd: 1 }]);
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

  const value = {
    productsInCart,
    addProductToCart,
    removeProductFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useGame = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useGame deve ser usado dentro de GameProvider");
  return context;
};
