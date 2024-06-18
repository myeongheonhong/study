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
const authService_1 = __importDefault(require("../services/authService"));
const responseMessage_1 = require("../utils/responseMessage");
const statusCode_1 = require("../constant/statusCode");
const jwt_1 = __importDefault(require("../utils/jwt"));
const postLocalLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { status, statusCode, message } = yield authService_1.default.postLocalLogin(email, password);
        if (status) {
            const accessToken = jwt_1.default.sign(email);
            res.send((0, responseMessage_1.success)(statusCode, message, { accessToken: accessToken }));
        }
        else {
            res.send((0, responseMessage_1.fail)(statusCode, message));
        }
    }
    catch (error) {
        console.log(error);
        res.send((0, responseMessage_1.fail)(statusCode_1.httpStatusCode.SERVICE_UNAVAILABLE, error));
    }
});
const postGoogleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    try {
        const { statusCode, message, data } = yield authService_1.default.postGoogleLogin(code);
        //구글 토큰 발행 실패
        if (!data) {
            res.send((0, responseMessage_1.fail)(statusCode, message));
        }
        else {
            const accessToken = jwt_1.default.sign(data.email);
            res.send((0, responseMessage_1.success)(statusCode, message, { accessToken: accessToken }));
        }
    }
    catch (error) {
        console.log(error);
        res.send((0, responseMessage_1.fail)(statusCode_1.httpStatusCode.SERVICE_UNAVAILABLE, error));
    }
});
const postKakaoLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    try {
        const { statusCode, message, data } = yield authService_1.default.postKakaoLogin(code);
        //카카오 토큰 발행 실패
        if (!data) {
            res.send((0, responseMessage_1.fail)(statusCode, message));
        }
        else {
            const accessToken = jwt_1.default.sign(data.email);
            res.send((0, responseMessage_1.success)(statusCode, message, { accessToken: accessToken }));
        }
    }
    catch (error) {
        console.log(error);
        res.send((0, responseMessage_1.fail)(statusCode_1.httpStatusCode.SERVICE_UNAVAILABLE, error));
    }
});
const postLocalSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
        const { status, statusCode, message } = yield authService_1.default.postLocalSignup(email, password, username);
        //회원가입 실패
        if (!status) {
            res.send((0, responseMessage_1.fail)(statusCode, message));
        }
        else {
            const accessToken = jwt_1.default.sign(email);
            res.send((0, responseMessage_1.success)(statusCode, message, { accessToken: accessToken }));
        }
    }
    catch (error) {
        console.log(error);
        res.send((0, responseMessage_1.fail)(statusCode_1.httpStatusCode.SERVICE_UNAVAILABLE, error));
    }
});
const authController = { postLocalLogin, postGoogleLogin, postKakaoLogin, postLocalSignup };
exports.default = authController;
