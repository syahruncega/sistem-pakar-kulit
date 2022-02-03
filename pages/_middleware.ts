import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const secret: any = process.env.JWT_SECRET;

export async function middleware(req: any, ev: NextFetchEvent) {
  const token = await getToken({
    req,
    secret,
  });
  const { pathname } = req.nextUrl;

  //Unprotected Route
  if (token && pathname === "/login") {
    return NextResponse.redirect("/");
  }
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //Protectd Route
  if (!token && pathname === "/") {
    return NextResponse.redirect("/login");
  }
}
