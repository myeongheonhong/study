import { NextFunction, Request, Response } from 'express';
declare const authMiddleware: {
    validateAccessToken: (req: Request, res: Response, next: NextFunction) => void;
};
export default authMiddleware;
//# sourceMappingURL=authMiddleware.d.ts.map