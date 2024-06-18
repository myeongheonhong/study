"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import multer from 'multer';
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// const partnersPortfolioMulter = multer({
//   storage: multer.diskStorage({
//     filename(req, file, done) {
//       console.log('filename');
//       console.log(req);
//       console.log(file);
//       done(null, file.originalname);
//     },
//     destination(req, file, done) {
//       console.log('destination');
//       console.log(req);
//       console.log(file);
//       done(null, path.join(__dirname, 'public'));
//     },
//   }),
// }).single('uploaded');
const partnersPortfolioMulter = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, done) {
            done(null, path_1.default.join(__dirname, '../../public/images/portfolios'));
        },
        filename(req, file, done) {
            const ext = path_1.default.extname(file.originalname);
            done(null, path_1.default.basename(file.originalname, ext) + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
}).single('image');
exports.default = partnersPortfolioMulter;
