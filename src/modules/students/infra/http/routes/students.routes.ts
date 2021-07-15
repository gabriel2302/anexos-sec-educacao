import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/people/infra/http/middlewares/ensureAuthenticated';
import ensureAuthorized from '@modules/people/infra/http/middlewares/ensureAuthorized';
import StudentsController from '../controllers/StudentsController';

const studentsController = new StudentsController();
const studentsRouter = Router();

studentsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      birthdate: Joi.date().required(),
    },
  }),
  studentsController.create,
);

// Rota que lista todos os estudantes em todas as instituicoes
studentsRouter.get(
  '/all',
  ensureAuthenticated,
  ensureAuthorized(['superadm']),
  studentsController.findAll,
);

studentsRouter.get(
  '/',
  ensureAuthenticated,
  studentsController.findAllByInstitutionId,
);

studentsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  studentsController.deleteById,
);

studentsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      birthdate: Joi.date(),
    },
  }),
  ensureAuthenticated,
  studentsController.update,
);

export default studentsRouter;
