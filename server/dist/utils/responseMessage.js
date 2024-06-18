"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = exports.success = void 0;
const success = (statusCode, message, data) => {
    return {
        statusCode,
        success: true,
        message,
        data,
    };
};
exports.success = success;
const fail = (statusCode, message) => {
    return {
        statusCode,
        success: false,
        message,
    };
};
exports.fail = fail;
