import { Booking } from "./entity";
import { createQueryBuilder, getManager } from 'typeorm'
import { AppError } from '../error'

export const getOne = async (id, db = getManager()): Promise<Booking> => {
    try {
        const result = await db.createQueryBuilder()
            .select("Booking")
            .from(Booking, "Booking")
            .where("Booking.id=:ID", { Id: id })
            .getOne();
        if (!result) { throw new AppError("booking not found",  id, 404) }
        return result;
    } catch (err) {
        if (err instanceof AppError){throw err}
        throw new AppError("internal database error", id, 500,err);
    }
}

export const create = async (booking: Booking, db = getManager()) => {
    try {
        db.createQueryBuilder()
        .insert()
        .into(Booking)
        .values([
            { date: booking.date, time: booking.time, user: booking.user, restaurant: booking.restaurant }
        ])
        .execute()
    } catch (err) {

        throw new AppError("booking not created",  booking, 404,err);
    }
}


export const del = async (id, db = getManager()) => {
    try {
        const result = await db.createQueryBuilder()
            .delete()
            .from(Booking)
            .where("id = :Id", { Id: id })
            .execute()
        if (!result?.affected) {
            throw new AppError("booking not found",  id, 404)
        }
    } catch (err) {
        if (err instanceof AppError){throw err}
        throw new AppError("booking not deleted",  id, 500,err);
    }
}

export const search = async (booking: Booking,numPage:number,limit:number, db = getManager()): Promise<[Booking[],number]> => {
    const qb = db.createQueryBuilder()
        .select("booking")
        .where("1=1");
    for (let key in booking) {
        if (booking[key]) {
            qb.andWhere(`Booking.${key}=:value`, { value: booking[key] })
        }
    }
    qb.take(limit);
    qb.skip(numPage*limit);
    try{const [result,count ]= await qb.getManyAndCount();
    if (!result) {
        throw new AppError("no booking found",  booking, 404);
    }
    return [result,count];}catch(err){
        if (err instanceof AppError){throw err}
        throw new AppError("internal database error",booking,500,err)}
}