import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Product from "@/components/Product/Product";
import constants from "@/constants/constants";
import { Product as PrismaProduct } from "@prisma/client";

async function getProducts(): Promise<PrismaProduct[]> {
  const productsResponse = await fetch(`${constants.APP_URL}/api/product`);
  return await productsResponse.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <PageWrapper className="min-h-screen-header">
      <h1 className="text-9xl font-bold">STORE</h1>
      <div className="grid grid-cols-4 gap-5">
        {products.splice(0, 4).map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </PageWrapper>
  );
}
