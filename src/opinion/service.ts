import { Opinion } from "./entity";
import { createQueryBuilder,getManager } from 'typeorm'
import { AppError } from '../error'

export const getOne = async (id, db = getManager()): Promise<Opinion> => {
    try {
        const result = await db.createQueryBuilder()
            .select("Opinion")
            .from(Opinion, "Opinion")
            .where("Opinion.id=:Id", { Id: id })
            .getOne();
        if (!result) { throw new AppError("opinion not found",  id, 404) }
        return result;
    } catch (err) {
        if (err instanceof AppError){throw err}
        throw new AppError("internal database error",  id, 500,err);
    }
}

export const create = async (opinion: Opinion, db = getManager()) => {
    try {
        db.createQueryBuilder()
        .insert()
        .into(Opinion)
        .values([
            { comment: opinion.comment, rating: opinion.rating, user: opinion.user, restaurant: opinion.restaurant }
        ])
        .execute()
    } catch (err) {

        throw new AppError("opinion not created",  opinion, 404,err);
    }
}

export const del = async (id, db = getManager()) => {
    try {
        const result = await db.createQueryBuilder()
            .delete()
            .from(Opinion)
            .where("id = :Id", { Id: id })
            .execute();
        if (!result?.affected) {
            throw new AppError("opinion not found",  id, 404)
        }
    } catch (err) {
        if (err instanceof AppError){throw err}
        throw new AppError("opinion not deleted",  id, 500,err);
    }
}

export const search = async (opinion: Opinion,numPage:number,limit:number, db = getManager()): Promise<[Opinion[],number]> => {
    const qb = db.createQueryBuilder()
        .select("opinion")
        .where("1=1");
    for (let key in opinion) {
        if (opinion[key]) {
            qb.andWhere(`Opinion.${key}=:value`, { value: opinion[key] })
        }
    }
    qb.take(limit);
    qb.skip(numPage*limit);
    try{const [result,count ]= await qb.getManyAndCount();
    if (!result) {
        throw new AppError("no opinion found",  opinion, 404);
    }
    return [result,count];}catch(err){
        if (err instanceof AppError){throw err}
        throw new AppError("internal database error",opinion,500,err)}
}