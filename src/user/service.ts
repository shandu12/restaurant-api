import { User } from "./entity";
import { createQueryBuilder, getManager, TransactionManager } from 'typeorm'
import { AppError } from '../error'
import { hash } from '../auth/hash';

export const getOne = async (id: number, db = getManager()): Promise<User> => {
    try {
        const result = await db.createQueryBuilder()
            .select("user")
            .from(User, "user")
            .where("user.id = :id", { id })
            .getOne();
        if (!result) { throw new AppError("user not found", id, 404) }
        return result;
    } catch (err) {
        if (err instanceof AppError){throw err}
        throw new AppError("internal database error",  id, 500,err);
    }
}


export const create = async (user: User, db = getManager()) => {
    try {
        await db.createQueryBuilder()
            .insert()
            .into(User)
            .values([
                { username: user.username, password: await hash(user.password) }
            ])
            .execute()
    } catch (err) {

        throw new AppError("user not created",  user, 404,err);
    }
}


export const update = async (id: number, user: User, db = getManager()) => {
    if (!db.queryRunner?.isTransactionActive) {
        return db.transaction(async transactional => { update(id, user, transactional) })
    }
    try {
        const usr = await getOne(id, db);
        for (let key in user) {
            if (user[key]) {
                usr[key] = user[key]
            }
        } await db.save(usr);
    } catch (err) {

        throw new AppError("user not updated", user, 500,err);
    }
}

export const del = async (id: number, db = getManager()) => {
    try {
        const result = await db.createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :Id", { Id: id })
            .execute()
        if (!result?.affected) {
            throw new AppError("user not found",  id, 404)
        }
    } catch (err) {
        
        if (err instanceof AppError){throw err}
        throw new AppError("user not deleted", id, 500,err);
    }
}
export const getbyname = async (username: string, db = getManager()): Promise<User> => {
    
    try {const result = await db.createQueryBuilder()
            .select("user")
            .from(User, "user")
            .where("user.username= :username", { username })
            .getOne();
       
    if (!result) { throw new AppError("user not found", {username}, 404) }
    return result;
    } catch (err) {
        if (err instanceof AppError){throw err}
        else throw new AppError("internal database error", {username}, 500,err);
    }
}
