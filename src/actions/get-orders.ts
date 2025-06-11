'use server'

import { auth } from '@/auth'
import { notFound } from 'next/navigation'
import prisma from "@/lib/prisma";

export async function getOrders () {
  const session = await auth()

  if (!session?.user?.email) {
    throw notFound()
  }

  return prisma.order.findMany({ orderBy: { createdAt: 'desc' }, where: { createdById: session.user.id } })
}
