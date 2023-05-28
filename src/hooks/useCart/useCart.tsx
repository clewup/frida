"use client";

import useApi from "@/lib/common/hooks/useApi/useApi";
import { Product, Cart } from "@prisma/client";

const useCart = () => {
  const { get, patch } = useApi();

  async function getCart() {
    return await get<Cart & { products: Product[] }>("/api/cart");
  }

  async function addToCart(product: Product) {
    try {
      const cart = await getCart();
      cart.products.push(product);
      return await patch<Cart & { products: Product[] }>("/api/cart", cart);
    } catch (error: any) {
      const newCart: Partial<Cart & { products: Product[] }> = {
        products: [product],
      };
      return await patch<Cart & { products: Product[] }>("/api/cart", newCart);
    }
  }

  return {
    getCart,
    addToCart,
  };
};

export default useCart;
