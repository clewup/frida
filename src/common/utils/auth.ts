import jwt from 'jsonwebtoken'

export function extractAndDecodeAccessToken (authorizationHeader: string | null) {
  if (!authorizationHeader) {
    return null
  }

  const token = authorizationHeader.split('Bearer ')?.[1]
  return jwt.decode(token)
}
