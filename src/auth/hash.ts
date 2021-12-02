import * as bcrypt from 'bcrypt';

const ROUNDS = 10;
export const compareHash = bcrypt.compare;
export const hash = (data: string) => bcrypt.hash(data, ROUNDS);
