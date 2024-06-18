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
const itemModel_1 = __importDefault(require("../models/itemModel"));
const createItem = (newItemData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = yield itemModel_1.default.create(newItemData);
        console.log(newItem);
        return { status: true, statusCode: statusCode_1.httpStatusCode.OK, message: '새로운 아이템 DB저장 성공' };
    }
    catch (error) {
        console.log(error);
        if (error.errorResponse.code === 11000) {
            return { status: false, statusCode: statusCode_1.httpStatusCode.CONFLICT, message: '이미 등록한 제품입니다.' };
        }
        return { status: false, statusCode: statusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR, message: '새로운 아이템 DB저장 실패' };
    }
});
const getItemList = (itemTitle) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchRegex = new RegExp(`${itemTitle}`, 'i');
        const itemList = yield itemModel_1.default.find({ itemTitle: { $regex: searchRegex } }, { itemTitle: 1, itemImage: 1 });
        return {
            status: true,
            statusCode: statusCode_1.httpStatusCode.OK,
            message: '아이템 리스트 불러오기 성공',
            data: { itemList: itemList },
        };
    }
    catch (error) {
        console.log(error);
        return { status: false, statusCode: statusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR, message: '아이템 리스트 불러오기 실패' };
    }
});
const searchMiddleware = {
    createItem,
    getItemList,
};
exports.default = searchMiddleware;
