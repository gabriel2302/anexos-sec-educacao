import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/people/infra/http/middlewares/ensureAuthenticated';
import ensureAuthorized from '@modules/people/infra/http/middlewares/ensureAuthorized';
import ClassroomController from '../controllers/ClassroomController';

const classroomController = new ClassroomController();
const classroomRouter = Router();

classroomRouter.post(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['adm']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      shift: Joi.string().required(),
      year: Joi.string().required().min(4).max(4),
      people: Joi.array()
        .items(
          Joi.object({
            id: Joi.string().uuid().required(),
          }),
        )
        .required(),
    },
  }),
  classroomController.create,
);

classroomRouter.get(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['adm']),
  classroomController.findAll,
);

classroomRouter.get(
  '/:id',
  ensureAuthenticated,
  ensureAuthorized(['adm']),
  classroomController.show,
);

export default classroomRouter;
