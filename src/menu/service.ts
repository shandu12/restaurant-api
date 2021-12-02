import { Menu } from "./entity";
import { createQueryBuilder, getManager } from 'typeorm'
import { AppError } from '../error'

export const getOne = async (id,db=getManager()): Promise<Menu> => {
    try {
        const result = await db.createQueryBuilder()
            .select("Menu")
            .from(Menu, "Menu")
            .where("Menu.id=:Id", { Id: id })
            .getOne();
        if (!result) { throw new AppError("menu not found",  id, 404) }
        return result;
    } catch (err) {
        if (err instanceof AppError){throw err}
        throw new AppError("internal database error", id, 500,err);
    }
}

export const create = async (menu: Menu,db=getManager()) => {
    try {
        db.createQueryBuilder()
            .insert()
            .into(Menu)
            .values([
                { name: menu.name, price: menu.price, restaurant: menu.restaurant }
            ])
            .execute()
    } catch (err) {

        throw new AppError("menu not created", menu, 404,err);
    }
}

export const del = async (id, db=getManager()) => {
    try {
        const result = await db.createQueryBuilder()
            .delete()
            .from(Menu)
            .where("id = :Id", { Id: id })
            .execute();
        if (!result?.affected) {
            throw new AppError("menu not found",  id, 404)
        }
    } catch (err) {
        if (err instanceof AppError){throw err}
        throw new AppError("menu not deleted",  id, 500,err);
    }
}

export const search = async (menu: Menu,numPage:number,limit:number, db=getManager()): Promise<[Menu[],number]> => {
    const qb = db.createQueryBuilder()
        .select("menu")
        .where("1=1");
    for (let key in menu) {
        if (menu[key]) {
            qb.andWhere(`Menu.${key}=:value`, { value: menu[key] })
        }
    }
    qb.take(limit);
    qb.skip(numPage*limit);
    try{const [result,count ]= await qb.getManyAndCount();
    if (!result) {
        throw new AppError("no menu found",  menu, 404);
    }
    return [result,count];}catch(err){
        if (err instanceof AppError){throw err}
        throw new AppError("internal database error",menu,500,err)}
}