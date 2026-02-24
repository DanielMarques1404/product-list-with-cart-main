import { useEffect, useState } from "react";
import { useCartContext } from "../../app/hooks/useCartContext";
import { cn } from "../../libs/cn";
import type { ProductType } from "../../types/types";

type AddToCartButtonProps = {
  product: ProductType;
  classname: string;
};

export const AddToCartButton = ({
  product,
  classname,
}: AddToCartButtonProps) => {
  const { productsInCart, addProductToCart, removeProductFromCart } =
    useCartContext();
  const [qtdInCart, setQtdInCart] = useState(
    productsInCart.find((p) => p.product.name === product.name)?.qtd || 0,
  );

  useEffect(() => {
    setQtdInCart(
      productsInCart.find((p) => p.product.name === product.name)?.qtd || 0,
    );
  }, [productsInCart]);

  const handleAddToCart = () => {
    addProductToCart(product);
    setQtdInCart(qtdInCart + 1);
  };

  const handleRemoveFromCart = () => {
    if (qtdInCart > 0) {
      removeProductFromCart(product.name);
      setQtdInCart(qtdInCart - 1);
    }
  };

  if (qtdInCart === 0)
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
        "bg-red text-white justify-between px-4": qtdInCart > 0,
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
      <span>{qtdInCart}</span>
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
