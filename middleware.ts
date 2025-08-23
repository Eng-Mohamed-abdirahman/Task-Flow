
import { auth } from "@/auth";   // path ku habboon

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Haddii user login yahay, loona joogo /auth, redirect to /dashboard
  if (isLoggedIn && pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Haddii user aan login loo sameynin, oo isku dayo /dashboard, redirect to /auth/login
  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/auth/login", req.nextUrl));
  }

  // Haddii kale, sii wad
  return;
});

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
