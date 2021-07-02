import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import studentsRouter from '@modules/students/infra/http/routes/students.routes';
import teachersRouter from '@modules/teachers/infra/http/routes/teachers.routes';
import institutionsRouter from '@modules/institutions/infra/http/routes/institutions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/students', studentsRouter);
routes.use('/profile', profileRouter);
routes.use('/institutions', institutionsRouter);
routes.use('/teachers', teachersRouter);

export default routes;
