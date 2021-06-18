import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  role: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub, role } = decoded as TokenPayload;
    request.user = {
      id: sub,
      role,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}
