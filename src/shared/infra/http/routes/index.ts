import { Router } from 'express';
import sessionsRouter from '@modules/people/infra/http/routes/sessions.routes';
import profileRouter from '@modules/people/infra/http/routes/profile.routes';
import studentsRouter from '@modules/students/infra/http/routes/students.routes';
import institutionsRouter from '@modules/institutions/infra/http/routes/institutions.routes';
import classroomsRouter from '@modules/classrooms/infra/http/routes/classroom.routes';

import peopleRouter from '@modules/people/infra/http/routes/people.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/students', studentsRouter);
routes.use('/profile', profileRouter);
routes.use('/institutions', institutionsRouter);
routes.use('/classrooms', classroomsRouter)

routes.use('/people', peopleRouter);
export default routes;
