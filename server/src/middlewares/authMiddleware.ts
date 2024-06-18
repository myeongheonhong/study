import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';

const validateAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('토큰이 존재하지 않습니다.');
    }

    const token = req.headers.authorization?.split(' ').reverse()[0];

    if (token && req.headers.authorization !== 'Bearer') {
      const decoded = jwt.verify(token);

      if (!decoded) {
        return;
      }

      if (typeof decoded === 'object') {
        req.headers.email = decoded.email;
      }
    } else {
      //에러처리
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const authMiddleware = { validateAccessToken };

export default authMiddleware;
