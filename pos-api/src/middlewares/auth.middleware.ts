import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../helpers/app-error.helper';

export function jwtVerify(secretKey: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = req?.cookies?.accessToken;

    const payload = jwt.verify(token, secretKey);

    res.locals.payload = payload; 

    next();
  };
}

export function roleVerify(allowedRoles: string[]) {
  return function(req: Request, res: Response, next: NextFunction){
    const {role} = res?.locals?.payload 

    if(!allowedRoles.includes(role)) throw AppError('Unauthorized access user role', 401); 

    next();
  }
}
