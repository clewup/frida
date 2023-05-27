import { Product } from "@prisma/client";
import { FC } from "react";
import { ShoppingCart as CartIcon } from "react-feather";

interface ProductProps {
  product: Product;
}

const Product: FC<ProductProps> = ({
  product: { id, name, description, image, price },
}) => {
  return (
    <div className="border-[1px] border-black rounded-md">
      <div className="p-10">
        <img src={image} alt={name} className="rounded-md" />
      </div>
      <div className="text-center">
        <h1 className="text-3xl">{name}</h1>
        <p>{description}</p>
      </div>
      <div className="p-10 flex justify-between items-center">
        <p className="text-3xl">£{Number(price).toFixed(2)}</p>
        <button className="btn btn-lg btn-ghost">
          <CartIcon />
        </button>
      </div>
    </div>
  );
};
export default Product;
