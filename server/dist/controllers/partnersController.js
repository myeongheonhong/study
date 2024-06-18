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
const partnersService_1 = __importDefault(require("../services/partnersService"));
const responseMessage_1 = require("../utils/responseMessage");
const statusCode_1 = require("../constant/statusCode");
const createPortfolio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file;
    const { title } = req.body;
    const { email } = req.headers;
    try {
        const { status, statusCode, message, data } = yield partnersService_1.default.createPortfolio(title, image, email);
        console.log(data);
        status ? res.send((0, responseMessage_1.success)(statusCode, message)) : res.send((0, responseMessage_1.fail)(statusCode, message));
    }
    catch (error) {
        console.log('error');
        res.send((0, responseMessage_1.fail)(statusCode_1.httpStatusCode.SERVICE_UNAVAILABLE, error));
    }
});
const getPortfolioList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.headers;
    try {
        const { status, statusCode, message, data } = yield partnersService_1.default.getPortfolioList(email);
        status ? res.send((0, responseMessage_1.success)(statusCode, message, data)) : res.send((0, responseMessage_1.fail)(statusCode, message));
    }
    catch (error) {
        console.log('error');
        res.send((0, responseMessage_1.fail)(statusCode_1.httpStatusCode.SERVICE_UNAVAILABLE, error));
    }
});
const partnersController = {
    createPortfolio,
    getPortfolioList,
};
exports.default = partnersController;
