import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface ISession {
    id: number
}

export async function getSession() {
    return getIronSession<ISession>(cookies(), {
        cookieName: "isUserloggedIn",
        password: "ThisIsLongSessionPassword!^_^1a2b3c4d5g80Z98"
    })
}