import searchMiddleware from '../middlewares/searchMiddleware';
import ItemModel from '../models/itemModel';

const searchItem = async (itemTitle: string) => {
  const {} = await searchMiddleware.getItemList(itemTitle);
  // db.products.find({ sku: { $regex: /^ABC/i } });
};

const searchService = {
  searchItem,
};

export default searchService;
