import { Type } from "io-ts";

export function serverDataDecoder<A, O>(t: Type<A, O>, o: unknown, errMess: string): A {
    const decoded = t.decode(o);
    if (decoded._tag === "Right") return decoded.right;
    alert(errMess);
    throw new Error(errMess);
}
