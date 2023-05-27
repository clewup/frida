import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Product from "@/components/Product/Product";

export default function Home() {
  return (
    <PageWrapper className="min-h-screen-header">
          <h1 className="text-9xl font-bold">STORE</h1>
        <div className="grid grid-cols-4 gap-5 h-[50vh]">
            <Product/>
            <Product/>
            <Product/>
            <Product/>
        </div>
    </PageWrapper>
  )
}
