import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

export default function ensureAuthorized(roles: Array<string>) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const { user } = request;

    if (roles.indexOf(user.role) > -1) {
      next();
    } else {
      throw new AppError('Forbidden.', 403);
    }
  };
}
