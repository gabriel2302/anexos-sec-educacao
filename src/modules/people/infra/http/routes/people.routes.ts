import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/people/infra/http/middlewares/ensureAuthenticated';
import ensureAuthorized from '@modules/people/infra/http/middlewares/ensureAuthorized';
import PeopleController from '../controllers/PeopleController';

const peopleController = new PeopleController();
const peopleRouter = Router();

peopleRouter.post(
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
    },
  }),
  peopleController.create,
);

// Rota somente para superadm
peopleRouter.get(
  '/all-people',
  ensureAuthenticated,
  ensureAuthorized(['superadm']),
  peopleController.listAll,
);

peopleRouter.get(
  '/all',
  ensureAuthenticated,
  ensureAuthorized(['adm']),
  peopleController.listAllById,
);

peopleRouter.patch(
  '/update/:id',
  ensureAuthenticated,
  ensureAuthorized(['adm']),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      office: Joi.string(),
      enrollment: Joi.string(),
      occupation: Joi.string().valid('PEB I', 'MONITOR DE CRECHE'),
      functional_situation: Joi.string().valid(
        'efetivo',
        'contrato',
        'dobra',
        'substituição',
      ),
    },
  }),
  peopleController.update,
);
export default peopleRouter;
