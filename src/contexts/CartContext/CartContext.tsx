"use client";

import useApi from "@/lib/common/hooks/useApi/useApi";
import { Cart, Product } from "@prisma/client";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface CartContextValues {
  cart: (Cart & { products: Product[] }) | null;
  setCart: Dispatch<SetStateAction<(Cart & { products: Product[] }) | null>>;
}

const CartContext = createContext<CartContextValues>({} as CartContextValues);

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<(Cart & { products: Product[] }) | null>(
    null
  );

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);

  if (!context)
    throw new Error("useCart may only be used within the CartContext");

  const { cart, setCart } = context;

  const { get, patch } = useApi();

  async function getCart() {
    const cart = await get<Cart & { products: Product[] }>("/api/cart");
    setCart(cart);
    return cart;
  }

  async function addToCart(product: Product) {
    if (cart) {
      const formattedCart = {
        ...cart,
        products: [...cart.products, product],
      };
      const updatedCart = await patch<Cart & { products: Product[] }>(
        "/api/cart",
        formattedCart
      );

      setCart(updatedCart);
      return updatedCart;
    }

    const newCart: Partial<Cart & { products: Product[] }> = {
      products: [product],
    };
    const createdCart = await patch<Cart & { products: Product[] }>(
      "/api/cart",
      newCart
    );

    setCart(createdCart);
    return createdCart;
  }

  async function removeFromCart(product: Product) {
    if (cart) {
      const formattedCart = {
        ...cart,
        products: cart.products.filter((prod) => prod.id !== product.id),
      };
      const updatedCart = await patch<Cart & { products: Product[] }>(
        "/api/cart",
        formattedCart
      );

      setCart(updatedCart);
      return updatedCart;
    }
  }

  return {
    ...context,
    getCart,
    addToCart,
    removeFromCart,
  };
};

export { CartProvider, useCart };
