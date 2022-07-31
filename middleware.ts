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

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (token) {
      url.pathname = "/";
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
