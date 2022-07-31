/* eslint-disable @next/next/no-server-import-in-page */
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

const secret: any = process.env.JWT_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret,
  });

  const url = req.nextUrl.clone();

  if (token && req.nextUrl.pathname.startsWith("/login")) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (token) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
