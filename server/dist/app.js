"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
dotenv_1.default.config({
    path: path_1.default.resolve(process.cwd(), process.env.NODE_ENV === 'production' ? '.env' : '.env.dev' //실제는 .env, 개발은 .env.dev사용
    ),
});
const app = (0, express_1.default)();
const PORT = 8080;
const corsOriginList = ['http://localhost:3000', 'http://localhost:8080'];
const corsOptions = {
    origin: corsOriginList,
    credentials: true,
    optionsSuccessStatus: 200,
};
// app.use(session({}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
}));
// app.use(corsMiddleware(corsOriginList));
//절대경로 설정
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
//데이터 베이스 연결
if (process.env.MONGO_URI) {
    mongoose_1.default.connect(process.env.MONGO_URI)
        .then(() => {
        console.log('Mongodb connected');
    })
        .catch((error) => {
        console.log(error);
    });
}
app.use('/', routes_1.default);
app.listen(PORT, () => {
    console.log(`
    #############################################
        🛡️ Server listening on port: ${PORT} 🛡️
    #############################################
    `);
});
