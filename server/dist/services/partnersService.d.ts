/// <reference types="cookie-session" />
/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
/// <reference types="passport" />
import { ServiceResponseType } from '../types/response';
declare const partnersService: {
    createPortfolio: (title: string, image?: Express.Multer.File, email?: string | string[]) => Promise<ServiceResponseType>;
    getPortfolioList: (email?: string | string[]) => Promise<ServiceResponseType>;
};
export default partnersService;
//# sourceMappingURL=partnersService.d.ts.map