"use client";

import CartProduct from "@/components/CartProduct/CartProduct";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useCart } from "@/contexts/CartContext/CartContext";
import { useLockr } from "@/lib/common/contexts/LockrContext/LockrContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function Cart() {
  const { cart, isLoading, getCart } = useCart();
  const { user } = useLockr();

  useEffect(() => {
    if (!user || cart) return;
    getCart();
  }, [user, cart]);

  return (
    <PageWrapper className="min-h-screen-header flex justify-center items-center">
      <div className="w-1/3 flex flex-col border-[1px] border-black rounded-md p-5">
        <div className="flex flex-col gap-5">
          {isLoading && (
            <div className="w-full h-60 flex justify-center items-center">
              <TailSpin color="#111111" />
            </div>
          )}

          {!isLoading && (!cart || !cart?.products.length) && (
            <p className="text-2xl text-center">Your cart is empty.</p>
          )}

          {!isLoading &&
            cart &&
            cart.products.length &&
            cart.products.map((product, index) => (
              <CartProduct product={product} key={index} />
            ))}
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
