import { Pool } from "pg";
import bcrypt from "bcryptjs";

export const DB = new Pool();

export const hashPass = (pass: string) => {
    return Buffer.from(bcrypt.hashSync(pass as string)).toString("base64");
};

export const verifyPass = (pass: string, hash: string) => {
    try {
        const raw = Buffer.from(hash, "base64").toString("utf8");
        return bcrypt.compareSync(pass, raw);
    } catch {
        return false;
    }
};
