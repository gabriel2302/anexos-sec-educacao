import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

profileRouter.get('/', profileController.show);

export default profileRouter;
