import { useCartContext } from "../app/hooks/useCartContext";
import { CartItemSummary } from "./layout/CartItems";

type ConfirmOrderProps = {
  handleClose: () => void;
};

export const ConfirmOrder = ({ handleClose }: ConfirmOrderProps) => {
  const { productsInCart, clearCart } = useCartContext();
  const total = productsInCart.reduce(
    (acc, p) => acc + p.product.price * p.qty,
    0,
  );

  const handleStartNew = () => {
    clearCart();
    handleClose();
  };

  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl m-auto w-full p-4 max-h-[90vh]">
      <img
        src="./assets/images/icon-order-confirmed.svg"
        alt="icon-confirmed"
        className="w-12 h-12"
      />
      <h1 className="flex">Order Confirmed</h1>
      <span className="flex text-rose-400">We hope you enjoy your food!</span>
      <div className="flex-1 overflow-y-auto mt-2">
        <ul>
          {productsInCart.map((p, index) => (
            <li key={`cart-item-${index}`}>
              <CartItemSummary product={p.product} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2 items-center justify-between p-4 bg-rose-50 ">
        <span>Order Total</span>
        <h2 className="text-rose-900">{`$${Number(total).toFixed(2)}`}</h2>
      </div>
      <div
        className="flex items-center justify-center p-2 bg-red text-white font-medium cursor-pointer rounded-2xl w-full my-3"
        onClick={handleStartNew}
      >
        <span>Start New Order</span>
      </div>
    </div>
  );
};
