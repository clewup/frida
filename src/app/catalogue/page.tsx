import Filter from "@/components/Filter/Filter";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Product from "@/components/Product/Product";
import { env } from "@/constants/env";
import { Product as PrismaProduct } from ".prisma/client";

async function getProducts(): Promise<PrismaProduct[]> {
  const productsResponse = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/product`
  );
  return await productsResponse.json();
}
export default async function Catalogue() {
  const products = await getProducts();

  return (
    <PageWrapper className="flex flex-col gap-5">
      <Filter />
      <div className="grid grid-cols-4 gap-5">
        {products.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </PageWrapper>
  );
}
