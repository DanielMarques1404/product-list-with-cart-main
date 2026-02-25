import { useEffect, useState } from "react";
import { useCartContext } from "../../app/hooks/useCartContext";
import { cn } from "../../libs/cn";
import type { Product } from "../../types/types";

type AddToCartButtonProps = {
  product: Product;
  classname: string;
};

export const AddToCartButton = ({
  product,
  classname,
}: AddToCartButtonProps) => {
  const { productsInCart, addProductToCart, removeProductFromCart } =
    useCartContext();
  const [qtyInCart, setQtyInCart] = useState(
    productsInCart.find((p) => p.product.name === product.name)?.qty || 0,
  );

  useEffect(() => {
    setQtyInCart(
      productsInCart.find((p) => p.product.name === product.name)?.qty || 0,
    );
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
        className="cursor-pointer border-2 border-white rounded-full w-5 h-5 flex items-center justify-center"
        onClick={handleRemoveFromCart}
      >
        <img
          src="./assets/images/icon-decrement-quantity.svg"
          alt="Icon Remove From Cart"
        />
      </div>
      <span>{qtyInCart}</span>
      <div
        className="cursor-pointer border-2 border-white rounded-full w-5 h-5 flex items-center justify-center"
        onClick={handleAddToCart}
      >
        <img
          className="cursor-pointer"
          src="./assets/images/icon-increment-quantity.svg"
          alt="Icon Add to Cart"
        />
      </div>
    </div>
  );
};
