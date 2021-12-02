import * as db from './service';
import { AppError } from '../error';
export const ctrl = {
    getOne: async (req, res, next) => {
        if (!req.params.name) {
            throw new AppError("invalid input",  req.params, 400);
        }

        const name = req.params.name;
        const r = await db.getOne(name);
        res.status(200).json(r);

    },
    create: async (req, res, next) => {
        if (!req.body.tag) {
            throw new AppError("invalid input",  req.body, 400);
        }
        const tag = req.body.tag;
        await db.create(tag);
        res.sendstatus(200);

    },

    del: async (req, res, next) => {
        if (!req.params.name) {
            throw new AppError("invalid input",  req.params, 400);
        }
        const name = req.params.name;
        await db.del(name);
        res.sendstatus(200);
    },

    search: async (req, res, next) => {
        let {filter,limitPage,page}=req.query
        if (!filter||!limitPage||page) {

            throw new AppError("invalid input",  req.query, 400);
        }
        
        const r = await db.search(filter,limitPage,page);
        res.status(200).json(r);

    }
}
