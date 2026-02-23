import { useState } from "react";
import { useCartContext } from "../../app/hooks/useCartContext";
import { cn } from "../../libs/cn";

type AddToCartButtonProps = {
  productName: string;
  classname: string;
};

export const AddToCartButton = ({
  productName,
  classname,
}: AddToCartButtonProps) => {
  const [qtdInCart, setQtdInCart] = useState(0);
  const { addProductToCart, removeProductFromCart } = useCartContext();

  const handleAddToCart = () => {
    addProductToCart(productName);
    setQtdInCart(qtdInCart + 1);
  };

  const handleRemoveFromCart = () => {
    if (qtdInCart > 0) {
      removeProductFromCart(productName);
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
