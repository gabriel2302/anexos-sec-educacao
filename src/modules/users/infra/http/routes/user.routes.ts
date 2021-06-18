import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      role: Joi.string(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string(),
    },
  }),
  usersController.create,
);

export default usersRouter;
