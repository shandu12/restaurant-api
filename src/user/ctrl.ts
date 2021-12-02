import * as db from './service';
import { AppError } from '../error';
export const ctrl = {
    getOne: async (req, res, next) => {
        if (!req.params.id) {
            throw new AppError("input invalido",  req.params, 400);
        }

        const  id  = req.params.id;
        const r = await db.getOne(id);
        res.status(200).json(r);

    },
    create: async (req, res, next) => {
        if (!req.body.user) {
            throw new AppError("input invalido",  req.body, 400);
        }
        const  user  = req.params.user;
        await db.create(user);
        res.sendstatus(200);

    },

    update: async (req, res, next) => {
        if (!req.params.id || !req.body.user) {
            throw new AppError("input invalido",  req, 400);
        }
        const  user  = req.body.user;
        const  id  = req.params.id;

        await db.update(id, user);
        res.sendstatus(200);
    },


    del: async (req, res, next) => {
        if (!req.params.id) {
            throw new AppError("input invalido",  req.params, 400);
        }
        const  id  = req.params.id;
        await db.del(id);
        res.sendstatus(200);
    },

}

