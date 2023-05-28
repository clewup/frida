import { Cart, Product } from "@prisma/client";
import { NextRequest, NextResponse as response } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const user = request.headers.get("x-user");
  if (!user) return response.json({ error: "Missing user" }, { status: 400 });

  const cart = await prisma.cart.findFirst({
    include: { products: true },
    where: { user: user },
  });
  if (!cart) return response.json({}, { status: 404 });

  return response.json(cart);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  const { isValid, errors } = validate(body);
  if (!isValid)
    return response.json(
      { error: `Invalid ${errors.join(", ")}` },
      { status: 400 }
    );

  const user = request.headers.get("x-user");
  if (!user) return response.json({ error: "Missing user" }, { status: 400 });

  const products = await prisma.product.findMany({
    where: { id: { in: body.products.map((product: Product) => product.id) } },
  });

  const total = calculateTotal(products);

  const upsertedCart = await prisma.cart.upsert({
    include: { products: true },
    where: { user: user },
    update: {
      updatedBy: user,
      products: {
        connect:
          body.products.map((product: Product) => ({ id: product.id })) || [],
      },
      total: total,
    },
    create: {
      createdBy: user,
      updatedBy: user,
      products: {
        connect:
          body.products.map((product: Product) => ({ id: product.id })) || [],
      },
      total: total,
      user: user,
    },
  });

  return response.json(upsertedCart);
}

function calculateTotal(products: Product[]) {
  let total = 0;

  for (const product of products) {
    total = total + Number(product.price);
  }

  return total;
}

function validate(body: Partial<Cart & { products: Product[] }>) {
  const errors: string[] = [];

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}
