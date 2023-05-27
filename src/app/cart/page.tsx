import CartProduct from "@/components/CartProduct/CartProduct";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { env } from "@/constants/env";
import { Cart, Product } from "@prisma/client";

async function getCart(): Promise<(Cart & { products: Product[] }) | null> {
  const cartReponse = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/cart?id=1`);
  return await cartReponse.json();
}

export default async function Cart() {
  const cart = await getCart();

  return (
    <PageWrapper className="min-h-screen-header flex justify-center items-center">
      <div className="w-1/3 flex flex-col items-center border-[1px] border-black rounded-md p-5 gap-5">
        {cart && cart.products?.length > 0 ? (
          cart.products.map((product, index) => (
            <CartProduct product={product} key={index} />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        <p>
          Total: £
          {cart && cart.products ? Number(cart.total).toFixed(2) : "0.00"}
        </p>
      </div>
    </PageWrapper>
  );
}
