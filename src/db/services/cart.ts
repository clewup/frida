import { mapCart } from '@/db/mappers/cart'
import prisma from '@/lib/prisma'
import { type CartItemType, type CartType } from '@/types/cartTypes'
import { type ProductType } from '@/types/productTypes'

export default class CartService {
  async getCartByUser (user: string): Promise<CartType | null> {
    const cart = await prisma.cart.findUnique({
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
                subcategory: true
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      },
      where: { user }
    })

    return (cart != null) ? mapCart(cart) : null
  }

  async getCartById (id: string): Promise<CartType | null> {
    const cart = await prisma.cart.findFirst({
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
                subcategory: true
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      },
      where: { id }
    })

    return (cart != null) ? mapCart(cart) : null
  }

  async createCart (user: string, product: ProductType, liveProduct: ProductType): Promise<CartType> {
    const cart = await prisma.cart.create({
      data: {
        createdBy: user,
        items: {
          create: {
            createdBy: user,
            product: {
              connect: { id: product.id }
            },
            quantity: 1,
            updatedBy: user
          }
        },
        total: liveProduct.price,
        updatedBy: user,
        user
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
                subcategory: true
              }
            }
          }
        }
      }
    })

    return mapCart(cart)
  }

  async addToCart (user: string, cart: CartType, product: ProductType, quantity: number, cartItem?: CartItemType) {
    // add to the quantity if product already exists in the cart, otherwise create it
    if (cartItem !== undefined) {
      await prisma.cart.update({
        data: {
          items: {
            update: {
              data: {
                quantity: cartItem.quantity + quantity
              },
              where: {
                id: cartItem.id
              }
            }
          }
        },
        where: { id: cart?.id }
      })
    } else {
      await prisma.cart.update({
        data: {
          items: {
            create: {
              createdBy: user,
              product: {
                connect: { id: product.id }
              },
              quantity: 1,
              updatedBy: user
            }
          }
        },
        where: { id: cart?.id }
      })
    }
  }

  async updateCartItem (user: string, cart: CartType, quantity: number, cartItem?: CartItemType) {
    await prisma.cart.update({
      data: {
        items: {
          update: {
            data: {
              quantity
            },
            where: {
              id: cartItem?.id
            }
          }
        }
      },
      where: { id: cart?.id }
    })
  }

  async clearCart (cart: CartType) {
    return await prisma.cart.update({
      data: {
        items: {
          deleteMany: {}
        }
      },
      where: { id: cart?.id }
    })
  }

  async removeFromCart (cart: CartType, cartItem?: CartItemType) {
    // deduct a quantity from the item if more than one, otherwise remove it
    if (cartItem !== undefined) {
      return await prisma.cart.update({
        data: {
          items: {
            delete: {
              id: cartItem.id
            }
          }
        },
        where: { id: cart.id }
      })
    } else {
      return await this.getCartById(cart.id)
    }
  }

  async updateCartTotal (cart: CartType) {
    return await prisma.cart.update({
      data: {
        total: calculateTotal(cart.items ?? [])
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      where: { id: cart.id }
    })
  }

  async deleteCart (cart: CartType) {
    await prisma.cart.delete({ where: { id: cart.id } })
  }
}

function calculateTotal (items: CartItemType[]) {
  let sum = 0
  for (let i = 0; i < items.length; i++) {
    sum += (Number(items[i].product.price) * items[i].quantity)
  }
  return sum
}
