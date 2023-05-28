"use client";

import { useCart } from "@/contexts/CartContext/CartContext";
import { Product } from "@prisma/client";
import { FC } from "react";
import { ShoppingCart as CartIcon } from "react-feather";

interface ProductProps {
  product: Product;
}

const Product: FC<ProductProps> = ({ product }) => {
  const { addToCart } = useCart();

  const { id, name, description, image, price } = product;

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
        <button
          className="btn btn-lg btn-ghost"
          onClick={() => addToCart(product)}
        >
          <CartIcon />
        </button>
      </div>
    </div>
  );
};
export default Product;
