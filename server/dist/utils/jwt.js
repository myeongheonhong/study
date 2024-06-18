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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sign = (email) => {
    if (!process.env.JWT_SECRET_KEY)
        return '';
    const payload = {
        email: email,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: '2h',
    });
};
const verify = (token) => {
    if (!process.env.JWT_SECRET_KEY)
        return;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        return decoded;
    }
    catch (err) {
        //token에러 처리해야됨
        console.log(err);
        return;
    }
};
const refresh = () => {
    if (!process.env.JWT_SECRET_KEY)
        return '';
    return jsonwebtoken_1.default.sign({}, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: '14d',
    });
};
const refreshVerify = (token, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_SECRET_KEY)
        return '';
    // const getAsync = promisify(redisClient.get).bind(redisClient);
    // try {
    //   const data = await getAsync(userId); // refresh token 가져오기
    //   if (token === data) {
    //     try {
    //       jwt.verify(token, secret);
    //       return true;
    //     } catch (err) {
    //       return false;
    //     }
    //   } else {
    //     return false;
    //   }
    // } catch (err) {
    //   return false;
    // }
});
const jwt = {
    sign,
    verify,
    refresh,
    refreshVerify,
};
exports.default = jwt;
