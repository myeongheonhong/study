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
const portfolioModel_1 = __importDefault(require("../models/portfolioModel"));
const createPortfolio = (title, image, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPortfolio = yield portfolioModel_1.default.create({
            user_id: userId,
            portfolio_title: title,
            portfolio_image_url: image.path,
        });
        return {
            status: true,
            statusCode: statusCode_1.httpStatusCode.OK,
            message: '새로운 포트폴리오 DB저장 성공',
            data: { newPortfolio: newPortfolio },
        };
    }
    catch (error) {
        console.log(error);
        return { status: false, statusCode: statusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR, message: '새로운 유저 DB저장 실패' };
    }
});
const getPortfolioList = (portfolioId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const portfolio = yield portfolioModel_1.default.findById(portfolioId);
        return {
            status: true,
            statusCode: statusCode_1.httpStatusCode.OK,
            message: '포트폴리오 조회 성공',
            data: { portfolio: portfolio },
        };
    }
    catch (error) {
        console.log(error);
        return { status: false, statusCode: statusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR, message: '새로운 유저 DB저장 실패' };
    }
});
const partnerRepository = {
    createPortfolio,
    getPortfolioList,
};
exports.default = partnerRepository;
