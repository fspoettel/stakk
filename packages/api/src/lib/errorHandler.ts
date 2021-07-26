import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errors';

const ERRORS = {
  INTERNAL: 'An internal server error has occured. Please try again later.'
};

export function errorHandler(err: unknown,_: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) return next(err);

  console.error(err);
  if (err instanceof ValidationError) {
    res.status(400);
    res.send({ error: err.message });
  } else {
    res.status(500);
    res.send({ error: ERRORS.INTERNAL });
  }
}