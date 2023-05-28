import prisma from "@/lib/prisma";
import { NextRequest, NextResponse as response } from "next/server";

export async function GET(request: NextRequest) {
  const PAGE_SIZE = 6;

  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort");

  const products = await prisma.product.findMany({
    include: { categories: true },
    orderBy: { createdAt: "desc" },
  });

  let filteredProducts = products;
  if (search)
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  if (category)
    filteredProducts = filteredProducts.filter((product) =>
      product.categories.some(
        (cat) => cat.name.toLowerCase() === category.toLowerCase()
      )
    );
  if (sort) {
    if (sort === "price-asc") {
      filteredProducts = filteredProducts.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }
    if (sort === "price-desc") {
      filteredProducts = filteredProducts.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }
  }

  console.log(filteredProducts);

  const paginatedProducts = filteredProducts.slice(
    (Number(page) - 1) * PAGE_SIZE,
    Number(page) * PAGE_SIZE
  );
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  return response.json({
    results: paginatedProducts,
    pagination: {
      totalResults: filteredProducts.length,
      pageResults: paginatedProducts.length,
      page: Number(page),
      totalPages: totalPages,
      resultsPerPage: PAGE_SIZE,
    },
  });
}
