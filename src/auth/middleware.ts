import { RequestHandler } from 'express';
import { verifyToken } from './token';
require('express-async-errors');


export const authMiddleware: RequestHandler = async (req, res, next) => {
    const auth = req.get('Authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
        res.status(401).send('No token');
        return;
    }
    const token = auth.split(' ')[1];
    try {
        res.locals.user = await verifyToken(token);
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    };
}