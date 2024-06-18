"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const partnersPortfolio_1 = __importDefault(require("../file/partnersPortfolio"));
const uploadMiddleware = {
    partnersPortfolioMulter: partnersPortfolio_1.default
};
exports.default = uploadMiddleware;
