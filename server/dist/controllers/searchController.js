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
const searchMiddleware_1 = __importDefault(require("../middlewares/searchMiddleware"));
const statusCode_1 = require("../constant/statusCode");
const responseMessage_1 = require("../utils/responseMessage");
const searchItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemTitle = req.query.itemTitle;
        const { status, statusCode, message, data } = yield searchMiddleware_1.default.getItemList(itemTitle);
        if (status) {
            res.send((0, responseMessage_1.success)(statusCode, message, data));
        }
        else {
            res.send((0, responseMessage_1.fail)(statusCode, message));
        }
    }
    catch (error) {
        res.send((0, responseMessage_1.fail)(statusCode_1.httpStatusCode.SERVICE_UNAVAILABLE, error));
    }
});
const searchController = {
    searchItem,
};
exports.default = searchController;
