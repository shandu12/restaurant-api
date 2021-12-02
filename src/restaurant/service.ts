import { Restaurant } from "./entity";
import { createQueryBuilder, getManager } from 'typeorm'
import { AppError } from '../error'

export const getOne = async (id ,db=getManager()): Promise<Restaurant> => {
   try{ const result = await db.createQueryBuilder()
        .select("Restaurant")
        .from(Restaurant, "Restaurant")
        .where("Restaurant.id=:ID", { Id: id })
        .getOne();
        if (!result) { throw new AppError("restaurant not found",  id, 404) }
        return result;
    } catch (err) {
        if (err instanceof AppError){throw err}
        throw new AppError("internal database error",  id, 500,err);
    }
}

export const create = async (restaurant: Restaurant,db=getManager()) => {
    try{db.createQueryBuilder()
        .insert()
        .into(Restaurant)
        .values([
            { name: restaurant.name, picture: restaurant.picture, averagePrice: restaurant.averagePrice, tags: restaurant.tags }
        ])
        .execute()
    } catch (err) {
        
        throw new AppError("restaurant not created",  restaurant, 404,err);
    }
}

export const update = async (id: number, restaurant: Restaurant,db=getManager()) => {
    if (!db.queryRunner?.isTransactionActive) {
        return db.transaction(async transactional => { update(id, restaurant, transactional) })
    }
    try {const rst= await getOne(id,db);
        for (let key in restaurant) {
            if (restaurant[key]) {
                rst[key]=restaurant[key]
            }
        }await db.save(rst);
    } catch (err) {

        throw new AppError("restaurant not updated", restaurant, 500,err);
    }
}

export const del = async (id,db=getManager()) => {
    try {
        const result = await db.createQueryBuilder()
        .delete()
        .from(Restaurant)
        .where("id = :Id", { Id: id })
        .execute();
         if (!result?.affected) {
            throw new AppError("restaurant not found",  id, 404)
        }
    } catch (err) {
        if (err instanceof AppError){throw err}
        throw new AppError("restaurant not deleted",  id, 500,err);
    }
}
export const search = async (restaurant: Restaurant,  numPage:number, limit:number,db=getManager()): Promise<[Restaurant[], number]> => {
    const qb = db.createQueryBuilder()
        .select("restaurant")
        .where("1=1");
    for (let key in restaurant) {
        if (restaurant[key]) {
            qb.andWhere(`Restaurant.${key}=:value`, { value: restaurant[key] })
        }
    }
    qb.take(limit);
    qb.skip(numPage*limit);
    try{const [result,count ]= await qb.getManyAndCount();
    if (!result) {
        throw new AppError("no restaurant found",  restaurant, 404);
    }
    return [result,count];}catch(err){
        if (err instanceof AppError){throw err}
        throw new AppError("internal database error",restaurant,500,err)}
}