import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Create a response to handoff to supabase client to modify response headers
  const res = NextResponse.next();
  const isAuthPage =
    req.nextUrl.pathname.includes("/login") ||
    req.nextUrl.pathname.includes("/register");

  const isCheckoutPage =
    req.nextUrl.pathname.includes("/manage-subscription") ||
    req.nextUrl.pathname.includes("/profile") ||
    req.nextUrl.pathname.includes("/dashboard");

  // Create authenticated supabase client
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (isAuthPage) {
    if (!session?.user) {
      return res;
    }
  }
  if (isCheckoutPage && session?.user) {
    return res;
  }
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/";
  // redirectUrl.searchParams.set(
  //   `redirectedFrom`,
  //   encodeURIComponent(req.nextUrl.pathname)
  // );
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/settings/:path*",
    "/auth/login",
    "/auth/register",
    "/settings/manage-subscription",
    "/user/:path*/profile",
    "/user/:path*/dashboard",
  ],
};
