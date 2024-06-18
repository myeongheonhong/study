"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchController_1 = __importDefault(require("../controllers/searchController"));
const router = (0, express_1.Router)();
router.get('/', searchController_1.default.searchItem);
exports.default = router;
