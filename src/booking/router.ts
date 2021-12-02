import { Router } from 'express';
import { ctrl } from './ctrl';
import { authMiddleware } from '../auth';

export const router: Router = Router();

router.use(authMiddleware);

router.get('/:id', ctrl.getOne);

router.get('/search', ctrl.search);

router.post('/',ctrl.create);

router.delete('/:id',ctrl.del);