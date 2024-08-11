import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface IPublicUrls {
    [key: string]: boolean
}

const publicOnlyUrls:IPublicUrls = {
    "/": true,
    "/log-in": true,
    "/create-account": true
}

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const exists = publicOnlyUrls[request.nextUrl.pathname];

    if (!session.id) {
        if (!exists) {
            return NextResponse.redirect(new URL("/log-in", request.url))
        }
    }

    // this code makes "localhost redirected you too many times" error
    // else {
    //     return NextResponse.redirect(new URL("/log-in", request.url))
    // }
    
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
}