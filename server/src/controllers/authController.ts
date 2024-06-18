import { Request, Response } from 'express';
import authService from '../services/authService';
import { fail, success } from '../utils/responseMessage';
import { httpStatusCode } from '../constant/statusCode';
import jwt from '../utils/jwt';

const postLocalLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { status, statusCode, message } = await authService.postLocalLogin(email, password);

    if (status) {
      const accessToken = jwt.sign(email);
      res.send(success(statusCode, message, { accessToken: accessToken }));
    } else {
      res.send(fail(statusCode, message));
    }
  } catch (error: any) {
    console.log(error);
    res.send(fail(httpStatusCode.SERVICE_UNAVAILABLE, error));
  }
};

const postGoogleLogin = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const { statusCode, message, data } = await authService.postGoogleLogin(code);
    //구글 토큰 발행 실패
    if (!data) {
      res.send(fail(statusCode, message));
    } else {
      const accessToken = jwt.sign(data.email);
      res.send(success(statusCode, message, { accessToken: accessToken }));
    }
  } catch (error: any) {
    console.log(error);
    res.send(fail(httpStatusCode.SERVICE_UNAVAILABLE, error));
  }
};

const postKakaoLogin = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const { statusCode, message, data } = await authService.postKakaoLogin(code);
    //카카오 토큰 발행 실패
    if (!data) {
      res.send(fail(statusCode, message));
    } else {
      const accessToken = jwt.sign(data.email);
      res.send(success(statusCode, message, { accessToken: accessToken }));
    }
  } catch (error: any) {
    console.log(error);
    res.send(fail(httpStatusCode.SERVICE_UNAVAILABLE, error));
  }
};

const postLocalSignup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const { status, statusCode, message } = await authService.postLocalSignup(email, password, username);
    //회원가입 실패
    if (!status) {
      res.send(fail(statusCode, message));
    } else {
      const accessToken = jwt.sign(email);
      res.send(success(statusCode, message, { accessToken: accessToken }));
    }
  } catch (error: any) {
    console.log(error);
    res.send(fail(httpStatusCode.SERVICE_UNAVAILABLE, error));
  }
};

const authController = { postLocalLogin, postGoogleLogin, postKakaoLogin, postLocalSignup };

export default authController;
