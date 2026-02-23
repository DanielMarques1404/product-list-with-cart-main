import { useCartContext } from "../app/hooks/useCartContext";

export const Cart = () => {
  const { productsInCart } = useCartContext();

  return (
    <div className="flex flex-col bg-amber-200 rounded-xl">
      <h1>{`Your Cart (${productsInCart.reduce((acc, p) => acc + p.qtd, 0)})`}</h1>
    </div>
  );
};
