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
      institution_id: Joi.string().uuid().required(),
    },
  }),
  peopleController.create,
);

// TODO: Deixar essa rota somente para superadm
peopleRouter.get(
  '/all',
  ensureAuthenticated,
  ensureAuthorized(['adm', 'superadm']),
  peopleController.listAll,
);
export default peopleRouter;
