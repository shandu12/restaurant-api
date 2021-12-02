import { Router } from 'express';
import { ctrl } from './ctrl';
import { authMiddleware } from '../auth';

export const router: Router = Router();

router.use(authMiddleware);

router.get('/:id', ctrl.getOne);

router.post('/',ctrl.create);

router.put('/:id', ctrl.update);

router.delete('/:id',ctrl.del);