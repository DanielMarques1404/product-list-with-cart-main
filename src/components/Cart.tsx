import { useState } from "react";
import { useCartContext } from "../app/hooks/useCartContext";
import { ConfirmOrder } from "./ConfirmOrder";
import { CartItem } from "./layout/CartItems";
import Modal from "./layout/Modal";

// export const CartItem = ({ product, qty }: ProductInCart) => {
//   const { clearCart } = useCartContext();

//   const handleRemoveItem = () => {
//     clearCart(product.name);
//   };

//   return (
//     <div className="flex items-center justify-between p-2 border-b border-rose-300">
//       <div className="flex flex-col justify-center gap-2">
//         <span className="font-medium">{product.name}</span>
//         <div className="flex gap-2 items-center">
//           <span className="text-red font-bold">{`${qty}x`}</span>
//           <span className="text-rose-400 font-small">{`@ $${Number(product.price).toFixed(2)}`}</span>
//           <span className="text-rose-500 font-medium">{`$${Number(product.price * qty).toFixed(2)}`}</span>
//         </div>
//       </div>

//       <div
//         className="flex items-center justify-start cursor-pointer border border-rose-300 p-[0.15rem] rounded-full"
//         onClick={handleRemoveItem}
//       >
//         <img src="./assets/images/icon-remove-item.svg" alt="Remove Item" />
//       </div>
//     </div>
//   );
// };

export const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { productsInCart } = useCartContext();
  const total = productsInCart.reduce(
    (acc, p) => acc + p.product.price * p.qty,
    0,
  );

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col bg-white w-full rounded-xl p-1 max-h-[80vh]">
        <h2 className="text-red">{`Your Cart (${productsInCart.reduce((acc, p) => acc + p.qty, 0)})`}</h2>
        {productsInCart.length === 0 ? (
          <div className="flex flex-col gap-1 items-center justify-center mt-8 w-full">
            <img
              src="./assets/images/illustration-empty-cart.svg"
              alt="Empty Cart"
            />
            <span className="text-rose-500 font-medium">
              Your added items will appear here
            </span>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto mt-2">
              <ul className="space-y-3">
                {productsInCart.map((productInCart, index) => (
                  <li key={`inCart-${index}`}>
                    <CartItem product={productInCart.product} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between p-2 my-3">
              <span>Order Total</span>
              <h2 className="text-rose-900">{`$${Number(total).toFixed(2)}`}</h2>
            </div>

            <div className="flex gap-2 bg-rose-50 text-rose-500 text-sm items-center justify-center p-2">
              <img
                src="./assets/images/icon-carbon-neutral.svg"
                alt="Carbon Neutral"
              />
              <span>
                This is a <strong>carbon-neutral</strong> delivery
              </span>
            </div>

            <div
              className="flex items-center justify-center p-2 bg-red text-white font-medium cursor-pointer rounded-2xl w-full my-3 hover:bg-rose-800"
              onClick={handleOpen}
            >
              <span>Confirm Order</span>
            </div>
          </>
        )}
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          <ConfirmOrder handleClose={handleClose} />
        </Modal>
      )}
    </>
  );
};
