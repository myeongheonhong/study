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
const authRepository_1 = __importDefault(require("../repository/authRepository"));
const partnersRepository_1 = __importDefault(require("../repository/partnersRepository"));
const createPortfolio = (title, image, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        return { status: false, statusCode: statusCode_1.httpStatusCode.BAD_REQUEST, message: '이메일 값이 안들어왔음.' };
    }
    if (!title || !image) {
        return { status: false, statusCode: statusCode_1.httpStatusCode.BAD_REQUEST, message: '포트폴리오 입력형식 확인' };
    }
    const user = typeof email === 'string' && (yield authRepository_1.default.getRegisteredUser(email));
    if (!user) {
        return { status: false, statusCode: statusCode_1.httpStatusCode.BAD_REQUEST, message: '계정 불러오기 실패' };
    }
    const { status, statusCode, message, data } = yield partnersRepository_1.default.createPortfolio(title, image, user.id);
    if (!data) {
        return {
            status: false,
            statusCode: statusCode,
            message: message,
        };
    }
    else {
        const { newPortfolio } = data;
        user.portfolio_id_list.push(newPortfolio._id);
        yield user.save();
        return {
            status: true,
            statusCode: statusCode_1.httpStatusCode.OK,
            message: '포트폴리오 업로드 성공',
        };
    }
});
const getPortfolioList = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = typeof email === 'string' && (yield authRepository_1.default.getRegisteredUser(email));
    if (!user) {
        return {
            status: false,
            statusCode: statusCode_1.httpStatusCode.BAD_REQUEST,
            message: '존재하지 않는 회원',
        };
    }
    else {
        let portfolioList = [];
        for (const id of user.portfolio_id_list) {
            const { data } = yield partnersRepository_1.default.getPortfolioList(id);
            if (data) {
                portfolioList.push(data.portfolio);
            }
        }
        // user.portfolio_id_list.map(async (id) => {
        //   const { data } = await partnerRepository.getPortfolioList(id);
        //   if (data) {
        //     console.log(data.portfolio);
        //     portfolioList.push(data.portfolio);
        //     console.log(portfolioList);
        //   }
        // });
        return {
            status: true,
            statusCode: statusCode_1.httpStatusCode.OK,
            message: '포트폴리오 조회 성공',
            data: portfolioList,
        };
    }
});
const partnersService = {
    createPortfolio,
    getPortfolioList,
};
exports.default = partnersService;
