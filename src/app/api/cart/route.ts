import { NextRequest, NextResponse as response } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const cart = await prisma.cart.findFirst({ where: { user: id } });

    if (!cart) return response.json({}, { status: 400 });

    return response.json(cart);
  }
}
