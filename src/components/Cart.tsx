import { useCartContext } from "../app/hooks/useCartContext";

export const Cart = () => {
  const { productsInCart } = useCartContext();

  return (
    <div className="flex flex-col bg-white w-full h-auto rounded-xl mt-4">
      <h2 className="text-red">{`Your Cart (${productsInCart.reduce((acc, p) => acc + p.qtd, 0)})`}</h2>
      {productsInCart.length === 0 ? (
        <div className="flex flex-col gap-1 items-center justify-center mt-8 w-full">
          <img
            src="./assets/images/illustration-empty-cart.svg"
            alt="Empty Cart"
          />
          <span className="text-rose-500 font-medium">Your added items will appear here</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
