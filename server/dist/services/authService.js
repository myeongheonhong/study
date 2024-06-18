"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const statusCode_1 = require("../constant/statusCode");
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const authRepository_1 = __importDefault(require("../repository/authRepository"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const postLocalLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password) {
        return { status: false, statusCode: statusCode_1.httpStatusCode.BAD_REQUEST, message: '비어있는 이메일 혹은 비밀번호' };
    }
    const registeredUser = yield authRepository_1.default.getRegisteredUser(email);
    if (!registeredUser) {
        return { status: false, statusCode: statusCode_1.httpStatusCode.BAD_REQUEST, message: '이메일이 존재하지 않습니다.' };
    }
    const result = yield bcrypt_1.default.compare(password, registeredUser.password);
    if (result) {
        //성공
        return { status: true, statusCode: statusCode_1.httpStatusCode.OK, message: '로그인 성공' };
    }
    else {
        return { status: false, statusCode: statusCode_1.httpStatusCode.BAD_REQUEST, message: '비밀번호가 일치 하지 않습니다.' };
    }
});
const getGoogleAccessToken = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
    const body = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_PW,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
    };
    //구글에서 클라이언트에게 발급해준 코드를 통해 구글에게 access_token을 발급요청
    const data = yield axios_1.default.post(GOOGLE_TOKEN_URL, body, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (data.status !== 200) {
        return { status: false, statusCode: statusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR, message: '구글 토큰 발행 실패' };
    }
    else {
        const { access_token } = data.data;
        return {
            status: true,
            statusCode: statusCode_1.httpStatusCode.OK,
            message: '구글 토큰 발행 성공',
            data: { accessToken: access_token },
        };
    }
});
const postGoogleLogin = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, statusCode, message, data } = yield getGoogleAccessToken(code);
    //구글 엑세스 토큰 불러오기 실패
    if (!status) {
        return { status: status, statusCode: statusCode, message: message };
    }
    const accessToken = data === null || data === void 0 ? void 0 : data.accessToken;
    const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const googleUserInfo = yield axios_1.default.get(GOOGLE_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!googleUserInfo) {
        return { status: false, statusCode: statusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR, message: '구글유저 정보 불러오기 실패' };
    }
    const { id, email, name, picture } = googleUserInfo.data;
    //초기로그인이라면 회원가입까지 진행
    const registeredUser = authRepository_1.default.getRegisteredUser(email);
    if (!registeredUser) {
        const refreshToken = jwt_1.default.refresh();
        const { status, statusCode, message } = yield authRepository_1.default.createUser({
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
        statusCode: statusCode_1.httpStatusCode.OK,
        message: '구글 로그인 성공',
        data: { id: id, email: email, name: name, picture: picture },
    };
});
const getKakaoAccessToken = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
    const body = {
        code,
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        grant_type: 'authorization_code',
    };
    //카카오에서 클라이언트에게 발급해준 코드를 통해 카카오에게 access_token을 발급요청
    const data = yield axios_1.default.post(KAKAO_TOKEN_URL, body, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
    });
    if (data.status !== 200) {
        return { status: false, statusCode: statusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR, message: '카카오 토큰 발행 실패' };
    }
    else {
        const { access_token } = data.data;
        return {
            status: true,
            statusCode: statusCode_1.httpStatusCode.OK,
            message: '카카오 토큰 발행 성공',
            data: { accessToken: access_token },
        };
    }
});
const postKakaoLogin = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, statusCode, message, data } = yield getKakaoAccessToken(code);
    //카카오 엑세스 토큰 불러오기 실패
    if (!data) {
        return { status: status, statusCode: statusCode, message: message };
    }
    const accessToken = data === null || data === void 0 ? void 0 : data.accessToken;
    const KAKAO_USERINFO_URL = 'https://kapi.kakao.com/v2/user/me';
    const kakaoUserInfo = yield axios_1.default.get(KAKAO_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
    });
    if (!kakaoUserInfo) {
        return {
            status: false,
            statusCode: statusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR,
            message: '카카오유저 정보 불러오기 실패',
        };
    }
    const id = kakaoUserInfo.data.id;
    const { nickname, thumbnail_image } = kakaoUserInfo.data.properties;
    //초기로그인이라면 회원가입까지 진행
    const registeredUser = authRepository_1.default.getRegisteredUser(id);
    if (!registeredUser) {
        const refreshToken = jwt_1.default.refresh();
        const { status, statusCode, message } = yield authRepository_1.default.createUser({
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
        statusCode: statusCode_1.httpStatusCode.OK,
        message: '카카오 로그인 성공',
        data: { id: id, email: id, name: nickname, picture: thumbnail_image },
    };
});
const postLocalSignup = (email, password, username) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password || !username) {
        return {
            status: false,
            statusCode: statusCode_1.httpStatusCode.BAD_REQUEST,
            message: '비어있는 이메일 혹은 비밀번호 혹은 유저이름',
        };
    }
    const registeredUser = yield authRepository_1.default.getRegisteredUser(email);
    if (registeredUser) {
        return { status: false, statusCode: statusCode_1.httpStatusCode.BAD_REQUEST, message: '이미 존재하는 회원입니다.' };
    }
    const refreshToken = jwt_1.default.refresh();
    const salt = bcrypt_1.default.genSaltSync(10);
    const uuid = (0, uuid_1.v4)();
    const { status, statusCode, message } = yield authRepository_1.default.createUser({
        id: uuid,
        email: email,
        password: bcrypt_1.default.hashSync(password, salt),
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
        statusCode: statusCode_1.httpStatusCode.OK,
        message: '회원가입 성공',
    };
});
const authService = {
    postLocalLogin,
    postGoogleLogin,
    postKakaoLogin,
    postLocalSignup,
};
exports.default = authService;
