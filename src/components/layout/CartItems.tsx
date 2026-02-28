import { useEffect, useState } from "react";
import { useCartContext } from "../../app/hooks/useCartContext";
import { cn } from "../../libs/cn";
import type { Product } from "../../types/types";

type CartItemProps = {
  product: Product;
  classname: string;
};

export const CartItemButton = ({ product, classname }: CartItemProps) => {
  const { productsInCart, addProductToCart, removeProductFromCart } =
    useCartContext();
  const productInCart = productsInCart.find(
    (p) => p.product.name === product.name,
  );
  const [qtyInCart, setQtyInCart] = useState(productInCart?.qty || 0);

  useEffect(() => {
    const updatedProductInCart = productsInCart.find(
      (p) => p.product.name === product.name,
    );
    setQtyInCart(updatedProductInCart?.qty || 0);
  }, [productsInCart]);

  const handleAddToCart = () => {
    addProductToCart(product);
    setQtyInCart(qtyInCart + 1);
  };

  const handleRemoveFromCart = () => {
    if (qtyInCart > 0) {
      removeProductFromCart(product.name);
      setQtyInCart(qtyInCart - 1);
    }
  };

  if (qtyInCart === 0)
    return (
      <div className={classname} onClick={handleAddToCart}>
        <img
          src="./assets/images/icon-add-to-cart.svg"
          alt="Icon Add to Cart"
        />
        <span>Add to Cart</span>
      </div>
    );

  return (
    <div
      className={cn(classname, {
        "bg-red text-white justify-between px-4": qtyInCart > 0,
      })}
    >
      <div
        className="group cursor-pointer border-2 border-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-white"
        onClick={handleRemoveFromCart}
      >
        <img
          src="./assets/images/icon-decrement-quantity.svg"
          alt="Icon Remove From Cart"
          className="group-hover:invert"
        />
      </div>
      <span>{qtyInCart}</span>
      <div
        className="group cursor-pointer border-2 border-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-white"
        onClick={handleAddToCart}
      >
        <img
          className="cursor-pointer group-hover:invert"
          src="./assets/images/icon-increment-quantity.svg"
          alt="Icon Add to Cart"
        />
      </div>
    </div>
  );
};

export const CartItem = ({ product }: { product: Product }) => {
  const { productsInCart, clearCart } = useCartContext();

  const productInCart = productsInCart.find(
    (p) => p.product.name === product.name,
  );
  const [qty, setQty] = useState(productInCart?.qty || 0);

  useEffect(() => {
    const updatedProductInCart = productsInCart.find(
      (p) => p.product.name === product.name,
    );
    setQty(updatedProductInCart?.qty || 0);
  }, [productsInCart]);

  const handleRemoveItem = () => {
    clearCart(product.name);
  };

  return (
    <div className="flex items-center justify-between p-2 border-b border-rose-300">
      <div className="flex flex-col justify-center gap-2">
        <span className="font-medium">{product.name}</span>
        <div className="flex gap-2 items-center">
          <span className="text-red font-bold">{`${qty}x`}</span>
          <span className="text-rose-400 font-small">{`@ $${Number(product.price).toFixed(2)}`}</span>
          <span className="text-rose-500 font-medium">{`$${Number(product.price * qty).toFixed(2)}`}</span>
        </div>
      </div>

      <div
        className="group flex items-center justify-start cursor-pointer border border-rose-300 hover:border-rose-500 p-[0.15rem] rounded-full"
        onClick={handleRemoveItem}
      >
        <img src="./assets/images/icon-remove-item.svg" alt="Remove Item" className="group-hover:brightness-75" />
      </div>
    </div>
  );
};

export const CartItemSummary = ({ product }: { product: Product }) => {
  const { productsInCart } = useCartContext();

  const productInCart = productsInCart.find(
    (p) => p.product.name === product.name,
  );
  const [qty, setQty] = useState(productInCart?.qty || 0);

  useEffect(() => {
    const updatedProductInCart = productsInCart.find(
      (p) => p.product.name === product.name,
    );
    setQty(updatedProductInCart?.qty || 0);
  }, [productsInCart]);

  return (
    <div className="flex gap-2 items-center justify-between px-4 py-2 bg-rose-50 ">
      <div className="w-12 h-12 m-2">
        <img src={product.image.thumbnail} alt={product.name} />
      </div>
      <div className="flex-1 items-center justify-start ">
        <span className="flex justify-start font-medium">{product.name}</span>
        <div className="flex justify-start gap-2">
          <span className="text-red font-bold">{`${qty}x`}</span>
          <span className="text-rose-400 font-small">{`@ $${Number(product.price).toFixed(2)}`}</span>
        </div>
      </div>
      <div>
        <span className="text-rose-500 font-medium">{`$${Number(product.price * qty).toFixed(2)}`}</span>
      </div>
    </div>
  );
};
