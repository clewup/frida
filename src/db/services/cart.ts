import prisma from '@/lib/prisma'
import { type CartItemType, type CartType } from '@/types/cartTypes'
import { type ProductType } from '@/types/productTypes'

export default class CartService {
  async getCartByUser (user: string): Promise<CartType | null> {
    return await prisma.cart.findUnique({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      where: { user }
    })
  }

  async getCartById (id: string): Promise<CartType | null> {
    return await prisma.cart.findUnique({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      where: { id }
    })
  }

  async createCart (user: string, product: ProductType, liveProduct: ProductType): Promise<CartType> {
    return await prisma.cart.create({
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
            product: true
          }
        }
      }
    })
  }

  async addToCart (user: string, cart: CartType, product: ProductType, cartItem?: CartItemType) {
    // add to the quantity if product already exists in the cart, otherwise create it
    if (cartItem !== undefined) {
      await prisma.cart.update({
        data: {
          items: {
            update: {
              data: {
                quantity: cartItem.quantity + 1
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
      if (cartItem.quantity > 1) {
        return await prisma.cart.update({
          data: {
            items: {
              update: {
                data: {
                  quantity: cartItem.quantity - 1
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
      }
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
