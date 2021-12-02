import { Tag } from "./entity";
import { createQueryBuilder,getManager } from 'typeorm'
import { AppError } from '../error'

export const getOne = async (name,db=getManager()): Promise<Tag> => {
    try {
         const result = db.createQueryBuilder()
        .select("Tag")
        .from(Tag, "Tag")
        .where("Tag.name=:name", { name})
        .getOne();
        if (!result) { throw new AppError("tag not found",  name, 404) }
        return result;
    } catch (err) {
        if (err instanceof AppError){throw err}
        throw new AppError("internal database error",  name, 500,err);
    }
}

export const create = async (tag: Tag,db=getManager()) => {
    try{db.createQueryBuilder()
        .insert()
        .into(Tag)
        .values([
            { name: tag.name }
        ])
        .execute()} catch (err) {

            throw new AppError("tag not created",  tag, 404,err);
        }
    }
    

export const del = async (name,db=getManager()) => {
    try{const result=await db.createQueryBuilder()
        .delete()
        .from(Tag)
        .where("id = :name", { name })
        .execute();
         if (!result?.affected) {
            throw new AppError("tag not found",  name, 404)
        }
    } catch (err) {
        if (err instanceof AppError){throw err}
        throw new AppError("tag not deleted",  name, 500,err);
    }
}

export const search = async (tag: Tag,limit:number, numPage:number,db=getManager()): Promise<[Tag[],number]> => {
    const qb = db.createQueryBuilder()
        .select("tag")
        .where("1=1");
        for (let key in tag) {
            if (tag[key]) {
                qb.andWhere(`tag.${key}=:value`, { value: tag[key] })
            }
        }
        qb.take(limit);
        qb.skip(numPage*limit);
        try{const [result,count ]= await qb.getManyAndCount();
        if (!result) {
            throw new AppError("no tag found",  tag, 404);
        }
        return [result,count];}catch(err){
            if (err instanceof AppError){throw err}
            throw new AppError("internal database error",tag,500,err)}
    }