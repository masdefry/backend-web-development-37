import { NextFunction, Request, Response } from 'express';

export function testMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('test middleware');
  next();
}
