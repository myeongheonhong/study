import { httpStatusCode } from '../constant/statusCode';
import ItemModel, { ItemSchemaTypes } from '../models/itemModel';
import { ServiceResponseType } from '../types/response';

const createItem = async (newItemData: ItemSchemaTypes): Promise<ServiceResponseType> => {
  try {
    const newItem = await ItemModel.create(newItemData);
    console.log(newItem);
    return { status: true, statusCode: httpStatusCode.OK, message: '새로운 아이템 DB저장 성공' };
  } catch (error: any) {
    console.log(error);
    if (error.errorResponse.code === 11000) {
      return { status: false, statusCode: httpStatusCode.CONFLICT, message: '이미 등록한 제품입니다.' };
    }

    return { status: false, statusCode: httpStatusCode.INTERNAL_SERVER_ERROR, message: '새로운 아이템 DB저장 실패' };
  }
};

const getItemList = async (itemTitle: string): Promise<ServiceResponseType> => {
  try {
    const searchRegex = new RegExp(`${itemTitle}`, 'i');

    const itemList = await ItemModel.find({ itemTitle: { $regex: searchRegex } }, { itemTitle: 1, itemImage: 1 });

    return {
      status: true,
      statusCode: httpStatusCode.OK,
      message: '아이템 리스트 불러오기 성공',
      data: { itemList: itemList },
    };
  } catch (error) {
    console.log(error);
    return { status: false, statusCode: httpStatusCode.INTERNAL_SERVER_ERROR, message: '아이템 리스트 불러오기 실패' };
  }
};

const searchMiddleware = {
  createItem,
  getItemList,
};

export default searchMiddleware;
