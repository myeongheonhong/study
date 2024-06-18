import { Request, Response } from 'express';
declare const authController: {
    postLocalLogin: (req: Request, res: Response) => Promise<void>;
    postGoogleLogin: (req: Request, res: Response) => Promise<void>;
    postKakaoLogin: (req: Request, res: Response) => Promise<void>;
    postLocalSignup: (req: Request, res: Response) => Promise<void>;
};
export default authController;
//# sourceMappingURL=authController.d.ts.map