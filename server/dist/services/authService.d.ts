import { ServiceResponseType } from '../types/response';
interface getGoogleLoginResponseType {
    id: string;
    email: string;
    name: string;
    picture: string;
}
declare const authService: {
    postLocalLogin: (email: string, password: string) => Promise<ServiceResponseType>;
    postGoogleLogin: (code: string) => Promise<ServiceResponseType<getGoogleLoginResponseType>>;
    postKakaoLogin: (code: string) => Promise<ServiceResponseType<getGoogleLoginResponseType>>;
    postLocalSignup: (email: string, password: string, username: string) => Promise<ServiceResponseType>;
};
export default authService;
//# sourceMappingURL=authService.d.ts.map