import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

export default function ensureAuthorized(roles: Array<string>) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const { role } = request.user;

    if (role && roles.indexOf(role) > -1) {
      next();
    } else {
      throw new AppError('Forbidden.', 403);
    }
  };
}
