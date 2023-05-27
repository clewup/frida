import { Product } from "@prisma/client";
import { FC } from "react";

interface CartProductProps {
  product: Product;
}

const CartProduct: FC<CartProductProps> = ({
  product: { name, image, price },
}) => {
  return (
    <div>
      <span>
        <img src={image} alt={name} />
      </span>
      <p>{name}</p>
      <p>£{Number(price).toFixed(2)}</p>
    </div>
  );
};

export default CartProduct;
