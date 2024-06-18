"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const portfolioSchema = new mongoose_1.default.Schema({
    user_id: { type: String },
    portfolio_title: { type: String },
    portfolio_image_url: { type: String },
});
const PortfolioModel = mongoose_1.default.model('Portfolio', portfolioSchema);
exports.default = PortfolioModel;
