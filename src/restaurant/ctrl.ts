import * as db from './service';
import { AppError } from '../error';


export const ctrl = {
    getOne: async (req, res, next) => {
        if (!req.params.id) {
            throw new AppError("invalid input",  req.params, 400);
        }

        const id = req.params.id;
        const r = await db.getOne(id);
        res.status(200).json(r);

    },
    create: async (req, res, next) => {
        if (!req.body.restaurant) {
            throw new AppError("invalid input",  req.body, 400);
        }
        const restaurant = req.body.restaurant;
        await db.create(restaurant);
        res.sendstatus(200);

    },

    update: async (req, res, next) => {
        if (!req.params.id || !req.body.restaurant) {
            throw new AppError("invalid input",  req, 400);
        }
        const restaurant = req.body.restaurant;
        const id = req.params.id;

        await db.update(id, restaurant);
        res.sendstatus(200);
    },


    del: async (req, res, next) => {
        if (!req.params.id) {
            throw new AppError("invalid input",  req.params, 400);
        }
        const id = req.params.id;
        await db.del(id);
        res.sendstatus(200);
    },





    search: async (req, res, next) => {
        let {filter, limitPage,page}=req.query
        if (!filter||!page||!limitPage) {

            throw new AppError("invalid input",  req.query, 400);
        }
        
        const r = await db.search(filter,limitPage,page);
        res.status(200).json(r);

    }
}
