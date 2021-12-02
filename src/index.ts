require('dotenv').config();
import   express from 'express';
import { createConnection, getConnectionOptions } from 'typeorm';
import { router as opinion } from './opinion/router';
import { router as restaurant } from './restaurant/router';
import { router as menu } from './menu/router';
import { router as tag } from './tag/router';
import { router as user } from './user/router';
import { router as booking } from './booking/router';
import {router as auth} from './auth/router';
import { handleErrorMiddleware } from './error'
import * as bodyParser from 'body-parser'

require('express-async-errors')

export async function start(config: any) {
    const opt = await getConnectionOptions();
    await createConnection({
        ...opt,
        dropSchema: true
    });
    const app = express();
    app.use(bodyParser.json())
    app.use('/opinion', opinion);
    app.use('/tag', tag);
    app.use('/restaurant', restaurant);
    app.use('/user', user);
    app.use('/menu', menu);
    app.use('/booking', booking);
    app.use('/auth',auth)
    app.use(handleErrorMiddleware);
    app.listen(+config.PORT);
}

async function main() {
    await start(process.env);
    console.log("started :)")
}

main().catch((err) => { console.error(err); })

