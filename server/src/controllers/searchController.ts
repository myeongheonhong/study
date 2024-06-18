import { Request, Response } from 'express';
import searchService from '../services/searchService';
import searchMiddleware from '../middlewares/searchMiddleware';
import { httpStatusCode } from '../constant/statusCode';
import { fail, success } from '../utils/responseMessage';

const searchItem = async (req: Request, res: Response) => {
  try {
    const itemTitle: any = req.query.itemTitle;

    const { status, statusCode, message, data } = await searchMiddleware.getItemList(itemTitle);
    if (status) {
      res.send(success(statusCode, message, data));
    } else {
      res.send(fail(statusCode, message));
    }
  } catch (error: any) {
    res.send(fail(httpStatusCode.SERVICE_UNAVAILABLE, error));
  }
};

const searchController = {
  searchItem,
};

export default searchController;
