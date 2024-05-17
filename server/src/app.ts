import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes';

dotenv.config();

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '.env' : '.env.dev' //실제는 .env, 개발은 .env.dev사용
  ),
});

const app = express();
const PORT = 8080;

const corsOriginList = ['http://localhost:3000', 'http://localhost:8080'];

const corsOptions = {
  origin: corsOriginList,
  credentials: true,
  optionsSuccessStatus: 200,
};

// app.use(session({}));

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
// app.use(corsMiddleware(corsOriginList));

//절대경로 설정
app.use(express.static(path.join(__dirname, 'public')));

//데이터 베이스 연결
if (process.env.MONGO_URI) {
  Mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Mongodb connected');
    })
    .catch((error) => {
      console.log(error);
    });
}

app.use('/', router);

app.listen(PORT, () => {
  console.log(`
    #############################################
        🛡️ Server listening on port: ${PORT} 🛡️
    #############################################
    `);
});
