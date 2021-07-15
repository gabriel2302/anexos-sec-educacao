import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/people/infra/http/middlewares/ensureAuthenticated';
import ensureAuthorized from '@modules/people/infra/http/middlewares/ensureAuthorized';
import InstitutionsController from '../controllers/InstitutionsController';

const institutionsController = new InstitutionsController();
const institutionsRouter = Router();

institutionsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['superadm']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      director: Joi.string().required(),
      learning_kind: Joi.string()
        .required()
        .valid('ensino fundamental', 'eja', 'educacao infantil'),
    },
  }),
  institutionsController.create,
);

institutionsRouter.get(
  '/all',
  ensureAuthenticated,
  ensureAuthorized(['superadm']),
  institutionsController.findAll,
);

institutionsRouter.put(
  '/:id',
  ensureAuthenticated,
  ensureAuthorized(['superadm']),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      director: Joi.string(),
      learning_kind: Joi.string().valid(
        'ensino fundamental',
        'eja',
        'educacao infantil',
      ),
    },
  }),
  institutionsController.update,
);

export default institutionsRouter;
