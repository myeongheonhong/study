"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    itemImage: { type: String },
    itemTitle: { type: String },
    itemDescription: { type: String },
    itemLike: { type: Number },
});
itemSchema.index({ itemTitle: 'text' });
const ItemModel = mongoose_1.default.model('Item', itemSchema);
exports.default = ItemModel;
