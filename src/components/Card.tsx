import { useCartContext } from "../app/hooks/useCartContext";
import { cn } from "../libs/cn";
import type { Product } from "../types/types";
import { CartItemButton } from "./layout/CartItems";


export const Card = ({product}: {product:Product}) => {
  const { existsInCart } = useCartContext();
  const isProductInCart = existsInCart(product.name);

  return (
    <div className="flex flex-col gap-6 m-1 select-none">
      <div className={cn("relative flex flex-1 w-68 items-center justify-center", {"border-2 border-red rounded-xl" : isProductInCart})}>
        <img
          src={product.image.desktop}
          alt="Product Image"
          className="rounded-xl"
        />
        <CartItemButton classname="absolute flex gap-2 items-center justify-center rounded-2xl p-2 border border-black shadow-xl w-3/4 -bottom-4.5 bg-white cursor-pointer hover:border hover:border-red" product={product} />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-rose-400">{product.category}</span>
        <span className="text-rose-950 text-[16px] font-bold">{product.name}</span>
        <span className="text-red font-medium">{`$${Number(product.price).toFixed(2)}`}</span>
      </div>
    </div>
  );
};
