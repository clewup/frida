"use client";

import CartProduct from "@/components/CartProduct/CartProduct";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useCart } from "@/contexts/CartContext/CartContext";
import { useLockr } from "@/lib/common/contexts/LockrContext/LockrContext";
import { Cart as PrismaCart, Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const { cart, getCart } = useCart();
  const { user } = useLockr();

  useEffect(() => {
    if (!user || cart) return;
    getCart();
  }, [user, cart]);

  return (
    <PageWrapper className="min-h-screen-header flex justify-center items-center">
      <div className="w-1/3 flex flex-col border-[1px] border-black rounded-md p-5">
        <div className="flex flex-col gap-5">
          {cart && cart.products?.length > 0 ? (
            cart.products.map((product, index) => (
              <CartProduct product={product} key={index} />
            ))
          ) : (
            <p className="text-2xl">Your cart is empty.</p>
          )}
        </div>

        <span className="divider" />

        <div className="flex justify-end">
          <p className="text-2xl">
            Total: £
            {cart && cart.products ? Number(cart.total).toFixed(2) : "0.00"}
          </p>
        </div>

        <Link href={"/checkout"}>
          <button
            className="btn btn-accent btn-lg text-base-100 mt-5 w-full"
            disabled={cart?.products.length === 0}
          >
            Checkout
          </button>
        </Link>
      </div>
    </PageWrapper>
  );
}
