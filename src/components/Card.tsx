import type { ProductType } from "../types/types";
import { AddToCartButton } from "./ui/AddToCartButton";

type CardProps = {
  product: ProductType;
};

export const Card = ({ product }: CardProps) => {
  return (
    <div className="flex flex-col gap-6 m-1 select-none">
      <div className="relative flex flex-1 w-68 items-center justify-center">
        <img
          src={product.image.desktop}
          alt="Product Image"
          className="rounded-xl"
        />
        <AddToCartButton classname="absolute flex gap-2 items-center justify-center rounded-2xl p-2 border shadow-2xl w-3/4 z-1 -bottom-4.5 bg-white cursor-pointer" productName={product.name} />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-rose-400">{product.category}</span>
        <span className="text-rose-950 text-[16px] font-bold">{product.name}</span>
        <span className="text-red font-medium">{`$${Number(product.price).toFixed(2)}`}</span>
      </div>
    </div>
  );
};
