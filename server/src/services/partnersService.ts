import { httpStatusCode } from '../constant/statusCode';
import { PortfolioSchemaTypes } from '../models/portfolioModel';
import authRepository from '../repository/authRepository';
import partnerRepository from '../repository/partnersRepository';
import { ServiceResponseType } from '../types/response';

const createPortfolio = async (
  title: string,
  image?: Express.Multer.File,
  email?: string | string[]
): Promise<ServiceResponseType> => {
  if (!email) {
    return { status: false, statusCode: httpStatusCode.BAD_REQUEST, message: '이메일 값이 안들어왔음.' };
  }

  if (!title || !image) {
    return { status: false, statusCode: httpStatusCode.BAD_REQUEST, message: '포트폴리오 입력형식 확인' };
  }

  const user = typeof email === 'string' && (await authRepository.getRegisteredUser(email));

  if (!user) {
    return { status: false, statusCode: httpStatusCode.BAD_REQUEST, message: '계정 불러오기 실패' };
  }

  const { status, statusCode, message, data } = await partnerRepository.createPortfolio(title, image, user.id);

  if (!data) {
    return {
      status: false,
      statusCode: statusCode,
      message: message,
    };
  } else {
    const { newPortfolio } = data;

    user.portfolio_id_list.push(newPortfolio._id);
    await user.save();

    return {
      status: true,
      statusCode: httpStatusCode.OK,
      message: '포트폴리오 업로드 성공',
    };
  }
};

const getPortfolioList = async (email?: string | string[]): Promise<ServiceResponseType> => {
  const user = typeof email === 'string' && (await authRepository.getRegisteredUser(email));

  if (!user) {
    return {
      status: false,
      statusCode: httpStatusCode.BAD_REQUEST,
      message: '존재하지 않는 회원',
    };
  } else {
    let portfolioList: PortfolioSchemaTypes[] = [];

    for (const id of user.portfolio_id_list) {
      const { data } = await partnerRepository.getPortfolioList(id);

      if (data) {
        portfolioList.push(data.portfolio);
      }
    }

    // user.portfolio_id_list.map(async (id) => {
    //   const { data } = await partnerRepository.getPortfolioList(id);

    //   if (data) {
    //     console.log(data.portfolio);
    //     portfolioList.push(data.portfolio);
    //     console.log(portfolioList);
    //   }
    // });

    return {
      status: true,
      statusCode: httpStatusCode.OK,
      message: '포트폴리오 조회 성공',
      data: portfolioList,
    };
  }
};

const partnersService = {
  createPortfolio,
  getPortfolioList,
};

export default partnersService;
