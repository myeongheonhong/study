import bcrypt from 'bcrypt';
import { ServiceResponseType } from '../types/response';
import { httpStatusCode } from '../constant/statusCode';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import authRepository from '../repository/authRepository';
import jwt from '../utils/jwt';

const postLocalLogin = async (email: string, password: string): Promise<ServiceResponseType> => {
  if (!email || !password) {
    return { status: false, statusCode: httpStatusCode.BAD_REQUEST, message: '비어있는 이메일 혹은 비밀번호' };
  }

  const registeredUser = await authRepository.getRegisteredUser(email);

  if (!registeredUser) {
    return { status: false, statusCode: httpStatusCode.BAD_REQUEST, message: '이메일이 존재하지 않습니다.' };
  }

  const result = await bcrypt.compare(password, registeredUser.password);

  if (result) {
    //성공
    return { status: true, statusCode: httpStatusCode.OK, message: '로그인 성공' };
  } else {
    return { status: false, statusCode: httpStatusCode.BAD_REQUEST, message: '비밀번호가 일치 하지 않습니다.' };
  }
};

interface getGoogleAccessTokenResponseType {
  accessToken: string;
}
const getGoogleAccessToken = async (code: string): Promise<ServiceResponseType<getGoogleAccessTokenResponseType>> => {
  const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
  const body = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_PW,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code',
  };

  //구글에서 클라이언트에게 발급해준 코드를 통해 구글에게 access_token을 발급요청
  const data: any = await axios.post(GOOGLE_TOKEN_URL, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (data.status !== 200) {
    return { status: false, statusCode: httpStatusCode.INTERNAL_SERVER_ERROR, message: '구글 토큰 발행 실패' };
  } else {
    const { access_token } = data.data;
    return {
      status: true,
      statusCode: httpStatusCode.OK,
      message: '구글 토큰 발행 성공',
      data: { accessToken: access_token },
    };
  }
};

interface getGoogleLoginResponseType {
  id: string;
  email: string;
  name: string;
  picture: string;
}

const postGoogleLogin = async (code: string): Promise<ServiceResponseType<getGoogleLoginResponseType>> => {
  const { status, statusCode, message, data } = await getGoogleAccessToken(code);

  //구글 엑세스 토큰 불러오기 실패
  if (!status) {
    return { status: status, statusCode: statusCode, message: message };
  }

  const accessToken = data?.accessToken;

  const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';
  const googleUserInfo: any = await axios.get(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!googleUserInfo) {
    return { status: false, statusCode: httpStatusCode.INTERNAL_SERVER_ERROR, message: '구글유저 정보 불러오기 실패' };
  }

  const { id, email, name, picture } = googleUserInfo.data;

  //초기로그인이라면 회원가입까지 진행
  const registeredUser = authRepository.getRegisteredUser(email);

  if (!registeredUser) {
    const refreshToken = jwt.refresh();

    const { status, statusCode, message } = await authRepository.createUser({
      id: id,
      email: email,
      password: 'google-login',
      username: name,
      registrationType: 'google',
      refreshToken: refreshToken,
      portfolio_id_list: [],
    });

    if (!status) {
      return {
        status: false,
        statusCode: statusCode,
        message: message,
      };
    }
  }

  return {
    status: true,
    statusCode: httpStatusCode.OK,
    message: '구글 로그인 성공',
    data: { id: id, email: email, name: name, picture: picture },
  };
};

interface getKakaoAccessTokenResponseType {
  accessToken: string;
}
const getKakaoAccessToken = async (code: string): Promise<ServiceResponseType<getKakaoAccessTokenResponseType>> => {
  const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';

  const body = {
    code,
    client_id: process.env.KAKAO_REST_API_KEY,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    grant_type: 'authorization_code',
  };

  //카카오에서 클라이언트에게 발급해준 코드를 통해 카카오에게 access_token을 발급요청
  const data: any = await axios.post(KAKAO_TOKEN_URL, body, {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  if (data.status !== 200) {
    return { status: false, statusCode: httpStatusCode.INTERNAL_SERVER_ERROR, message: '카카오 토큰 발행 실패' };
  } else {
    const { access_token } = data.data;
    return {
      status: true,
      statusCode: httpStatusCode.OK,
      message: '카카오 토큰 발행 성공',
      data: { accessToken: access_token },
    };
  }
};

const postKakaoLogin = async (code: string): Promise<ServiceResponseType<getGoogleLoginResponseType>> => {
  const { status, statusCode, message, data } = await getKakaoAccessToken(code);

  //카카오 엑세스 토큰 불러오기 실패
  if (!data) {
    return { status: status, statusCode: statusCode, message: message };
  }

  const accessToken = data?.accessToken;

  const KAKAO_USERINFO_URL = 'https://kapi.kakao.com/v2/user/me';

  const kakaoUserInfo: any = await axios.get(KAKAO_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  if (!kakaoUserInfo) {
    return {
      status: false,
      statusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
      message: '카카오유저 정보 불러오기 실패',
    };
  }

  const id = kakaoUserInfo.data.id;
  const { nickname, thumbnail_image } = kakaoUserInfo.data.properties;

  //초기로그인이라면 회원가입까지 진행
  const registeredUser = authRepository.getRegisteredUser(id);

  if (!registeredUser) {
    const refreshToken = jwt.refresh();

    const { status, statusCode, message } = await authRepository.createUser({
      id: id,
      email: id,
      password: 'kakao-login',
      username: nickname,
      registrationType: 'kakao',
      refreshToken: refreshToken,
      portfolio_id_list: [],
    });

    if (!status) {
      return {
        status: false,
        statusCode: statusCode,
        message: message,
      };
    }
  }

  return {
    status: true,
    statusCode: httpStatusCode.OK,
    message: '카카오 로그인 성공',
    data: { id: id, email: id, name: nickname, picture: thumbnail_image },
  };
};

const postLocalSignup = async (email: string, password: string, username: string): Promise<ServiceResponseType> => {
  if (!email || !password || !username) {
    return {
      status: false,
      statusCode: httpStatusCode.BAD_REQUEST,
      message: '비어있는 이메일 혹은 비밀번호 혹은 유저이름',
    };
  }

  const registeredUser = await authRepository.getRegisteredUser(email);

  if (registeredUser) {
    return { status: false, statusCode: httpStatusCode.BAD_REQUEST, message: '이미 존재하는 회원입니다.' };
  }

  const refreshToken = jwt.refresh();

  const salt = bcrypt.genSaltSync(10);
  const uuid = uuidv4();

  const { status, statusCode, message } = await authRepository.createUser({
    id: uuid,
    email: email,
    password: bcrypt.hashSync(password, salt),
    username: username,
    registrationType: 'local',
    refreshToken: refreshToken,
    portfolio_id_list: [],
  });

  if (!status) {
    return {
      status: false,
      statusCode: statusCode,
      message: message,
    };
  }

  return {
    status: true,
    statusCode: httpStatusCode.OK,
    message: '회원가입 성공',
  };
};

const authService = {
  postLocalLogin,
  postGoogleLogin,
  postKakaoLogin,
  postLocalSignup,
};

export default authService;
