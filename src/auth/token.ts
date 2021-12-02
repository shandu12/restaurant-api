import * as jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken';
const KEY = process.env.JWTTOKEN;

export async function signToken(payload: string | Object, expiresIn = '1h'): Promise<string> {
    return new Promise((res, rej) => {
        jwt.sign(payload, KEY, {
            expiresIn,
        }, (err, token) => {
            if (err) rej(err);
            else res(token);
        });
    });
}

export async function verifyToken(token: string): Promise<JwtPayload> {
    return new Promise((res, rej) => {
        jwt.verify(token, KEY, (err, decoded) => {
            if (err) rej(err);
            else res(decoded);
        });
    });
}