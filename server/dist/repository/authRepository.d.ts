import { UserSchemaTypes } from '../models/userModel';
import { ServiceResponseType } from '../types/response';
declare const authRepository: {
    getRegisteredUser: (email: string) => Promise<UserSchemaTypes | null>;
    createUser: (newUserData: UserSchemaTypes) => Promise<ServiceResponseType>;
};
export default authRepository;
//# sourceMappingURL=authRepository.d.ts.map