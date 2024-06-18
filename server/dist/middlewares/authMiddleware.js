"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../utils/jwt"));
const validateAccessToken = (req, res, next) => {
    var _a;
    try {
        if (!req.headers.authorization) {
            throw new Error('토큰이 존재하지 않습니다.');
        }
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ').reverse()[0];
        if (token && req.headers.authorization !== 'Bearer') {
            const decoded = jwt_1.default.verify(token);
            if (!decoded) {
                return;
            }
            if (typeof decoded === 'object') {
                req.headers.email = decoded.email;
            }
        }
        else {
            //에러처리
        }
        next();
    }
    catch (error) {
        return next(error);
    }
};
const authMiddleware = { validateAccessToken };
exports.default = authMiddleware;
