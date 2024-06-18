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
const statusCode_1 = require("../constant/statusCode");
const userModel_1 = __importDefault(require("../models/userModel"));
const getRegisteredUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ email: email });
    return user;
});
const createUser = (newUserData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield userModel_1.default.create(newUserData);
        console.log(newUser);
        return { status: true, statusCode: statusCode_1.httpStatusCode.OK, message: '새로운 유저 DB저장 성공' };
    }
    catch (error) {
        console.log(error);
        if (error.errorResponse.code === 11000) {
            return { status: false, statusCode: statusCode_1.httpStatusCode.CONFLICT, message: '이미 존재하는 회원입니다.' };
        }
        return { status: false, statusCode: statusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR, message: '새로운 유저 DB저장 실패' };
    }
});
const authRepository = {
    getRegisteredUser,
    createUser,
};
exports.default = authRepository;
