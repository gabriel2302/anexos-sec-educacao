import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAuthorized from '../middlewares/ensureAuthorized';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      role: Joi.string().valid('adm', 'user'),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string(),
    },
  }),
  usersController.create,
);

usersRouter.get(
  '/all',
  ensureAuthenticated,
  ensureAuthorized(['adm']),
  usersController.listAll,
);

export default usersRouter;
