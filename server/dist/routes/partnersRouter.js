"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partnersController_1 = __importDefault(require("../controllers/partnersController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const router = (0, express_1.Router)();
router.post('/upload', authMiddleware_1.default.validateAccessToken, uploadMiddleware_1.default.partnersPortfolioMulter, partnersController_1.default.createPortfolio);
router.get('/portfolios', authMiddleware_1.default.validateAccessToken, partnersController_1.default.getPortfolioList);
exports.default = router;
