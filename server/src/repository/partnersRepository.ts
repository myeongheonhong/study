import { ObjectId } from 'mongoose';
import { httpStatusCode } from '../constant/statusCode';
import PortfolioModel from '../models/portfolioModel';
import { ServiceResponseType } from '../types/response';

const createPortfolio = async (
  title: string,
  image: Express.Multer.File,
  userId: string
): Promise<ServiceResponseType> => {
  try {
    const newPortfolio = await PortfolioModel.create({
      user_id: userId,
      portfolio_title: title,
      portfolio_image_url: image.path,
    });

    return {
      status: true,
      statusCode: httpStatusCode.OK,
      message: '새로운 포트폴리오 DB저장 성공',
      data: { newPortfolio: newPortfolio },
    };
  } catch (error: any) {
    console.log(error);

    return { status: false, statusCode: httpStatusCode.INTERNAL_SERVER_ERROR, message: '새로운 유저 DB저장 실패' };
  }
};

const getPortfolioList = async (portfolioId: ObjectId): Promise<ServiceResponseType> => {
  try {
    const portfolio = await PortfolioModel.findById(portfolioId);

    return {
      status: true,
      statusCode: httpStatusCode.OK,
      message: '포트폴리오 조회 성공',
      data: { portfolio: portfolio },
    };
  } catch (error: any) {
    console.log(error);

    return { status: false, statusCode: httpStatusCode.INTERNAL_SERVER_ERROR, message: '새로운 유저 DB저장 실패' };
  }
};

const partnerRepository = {
  createPortfolio,
  getPortfolioList,
};

export default partnerRepository;
