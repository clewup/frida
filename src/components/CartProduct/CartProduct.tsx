import { Product } from "@prisma/client";
import { FC } from "react";

interface CartProductProps {
  product: Product;
}

const CartProduct: FC<CartProductProps> = ({
  product: { name, image, price },
}) => {
  return (
    <div className="flex gap-5">
      <span className="w-1/4 aspect-square">
        <img src={image} alt={name} className="rounded-md" />
      </span>
      <span>
        <h1 className="text-2xl">{name}</h1>
        <p className="text-2xl">£{Number(price).toFixed(2)}</p>
      </span>
    </div>
  );
};

export default CartProduct;
