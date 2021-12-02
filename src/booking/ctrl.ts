import * as db from './service';
import { AppError } from '../error';
export const ctrl = {
    getOne: async (req, res, next) => {
        if (!req.params.id) {
            throw new AppError("invalid input",   req.params, 400);
        }

        const id = req.params.id;
        const r = await db.getOne(id);
        res.status(200).json(r);

    },
    create: async (req, res, next) => {
        if (!req.body.booking) {
            throw new AppError("invalid input",   req.body, 400);
        }
        const booking = req.params.booking;
        await db.create(booking);
        res.sendstatus(200);

    },


    del: async (req, res, next) => {
        if (!req.params.id) {
            throw new AppError("invalid input",   req.params, 400);
        }
        const id = req.params.id;
        await db.del(id);
        res.sendstatus(200);
    },




    search: async (req, res, next) => {
        let {filter, limitPage,page}=req.query
        if (!filter) {

            throw new AppError("invalid input",  req.query, 400);
        }
        
        const r = await db.search(filter,page,limitPage);
        res.status(200).json(r);

    }

}
