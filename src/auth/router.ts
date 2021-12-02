import { Router } from 'express';
import * as db from '../user/service';
import { hash, compareHash } from './hash';
import { signToken } from './token';
import _ from 'lodash';

export const router = Router();
router.post('/register', async (req, res) => {
    {
        const  user = req.body;
        try {
            await db.create(user);
            res.sendStatus(200);
        } catch (err) {
            res.status(400).send('Username already taken');
        }
    };
}),

router.post('/login', async (req, res) => {
    const { username, password }  = req.body;
    const user = await db.getbyname(username);
    if (!user) {
        return res.sendStatus(404);
    }
    const isOk = await compareHash(password, user.password);
    if (!isOk) {
        throw new Error('invalid password');
    }
    const jwt = await signToken(_.pick(user, ['id','name']), '1h');
    return res.send({token: jwt});
});

