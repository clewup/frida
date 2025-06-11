import jwt from 'jsonwebtoken'
import { type User } from '@prisma/client'

export function extractAndDecodeAccessToken (authorizationHeader: string | null) {
  if (!authorizationHeader) {
    return null
  }

  const token = authorizationHeader.split('Bearer ')?.[1]
  return jwt.decode(token) as User
}
