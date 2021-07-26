import { Request, Response, NextFunction } from 'express';

function asyncHandler(
  callback: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
  ) {
  return function (req: Request, res: Response, next: NextFunction): void {
    callback(req, res, next).catch(next);
  };
}

export default asyncHandler;
