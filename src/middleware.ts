import { PUBLIC_ROUTES, ROOT } from '@/lib/routes'
import { auth } from '@/auth'

export default auth((req) => {
  const { nextUrl } = req

  // const isAuthenticated = !!req.auth
  // const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)
  // console.log(nextUrl.pathname)
  //
  // if (!isAuthenticated && !isPublicRoute) { return Response.redirect(new URL(ROOT, nextUrl)) }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
