import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function jwtVerify(secretKey: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = req?.cookies?.accessToken;

    const payload = jwt.verify(token, secretKey);

    res.locals.payload = payload; 

    next();
  };
}
