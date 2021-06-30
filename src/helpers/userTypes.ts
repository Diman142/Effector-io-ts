// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as t from "io-ts";


export const AuthRes = t.type({
    idToken: t.string,
    email: t.string,
    refreshToken: t.string,
    expiresIn: t.string,
    localId: t.string,
    registered: t.boolean
}, "AuthRes");

