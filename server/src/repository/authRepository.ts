import { httpStatusCode } from '../constant/statusCode';
import UserModel, { UserSchemaTypes } from '../models/userModel';
import { ServiceResponseType } from '../types/response';

const getRegisteredUser = async (email: string): Promise<UserSchemaTypes | null> => {
  const user = await UserModel.findOne({ email: email });

  return user;
};

const createUser = async (newUserData: UserSchemaTypes): Promise<ServiceResponseType> => {
  try {
    const newUser = await UserModel.create(newUserData);
    console.log(newUser);
    return { status: true, statusCode: httpStatusCode.OK, message: '새로운 유저 DB저장 성공' };
  } catch (error: any) {
    console.log(error);
    if (error.errorResponse.code === 11000) {
      return { status: false, statusCode: httpStatusCode.CONFLICT, message: '이미 존재하는 회원입니다.' };
    }

    return { status: false, statusCode: httpStatusCode.INTERNAL_SERVER_ERROR, message: '새로운 유저 DB저장 실패' };
  }
};

const authRepository = {
  getRegisteredUser,
  createUser,
};

export default authRepository;
