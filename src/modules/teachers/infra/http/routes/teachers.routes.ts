import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAuthorized from '@modules/users/infra/http/middlewares/ensureAuthorized';
import TeachersController from '../controllers/TeachersController';

const teachersController = new TeachersController();
const teachersRouter = Router();

teachersRouter.post(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['adm', 'superadm']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      enrollment: Joi.string().required(),
      office: Joi.string().required(),
      occupation: Joi.string().required().valid('PEB I', 'MONITOR DE CRECHE'),
      functional_situation: Joi.string()
        .required()
        .valid('efetivo', 'contrato', 'dobra', 'substituição'),
      institution_id: Joi.string().uuid().required(),
    },
  }),
  teachersController.create,
);

export default teachersRouter;
