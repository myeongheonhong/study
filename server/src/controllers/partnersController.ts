import { Request, Response } from 'express';
import partnersService from '../services/partnersService';
import { fail, success } from '../utils/responseMessage';
import { httpStatusCode } from '../constant/statusCode';

const createPortfolio = async (req: Request, res: Response) => {
  const image = req.file;
  const { title } = req.body;
  const { email } = req.headers;

  try {
    const { status, statusCode, message, data } = await partnersService.createPortfolio(title, image, email);

    console.log(data);

    status ? res.send(success(statusCode, message)) : res.send(fail(statusCode, message));
  } catch (error: any) {
    console.log('error');
    res.send(fail(httpStatusCode.SERVICE_UNAVAILABLE, error));
  }
};

const getPortfolioList = async (req: Request, res: Response) => {
  const { email } = req.headers;

  try {
    const { status, statusCode, message, data } = await partnersService.getPortfolioList(email);

    status ? res.send(success(statusCode, message, data)) : res.send(fail(statusCode, message));
  } catch (error: any) {
    console.log('error');
    res.send(fail(httpStatusCode.SERVICE_UNAVAILABLE, error));
  }
};

const partnersController = {
  createPortfolio,
  getPortfolioList,
};

export default partnersController;
