import { ItemSchemaTypes } from '../models/itemModel';
import { ServiceResponseType } from '../types/response';
declare const searchMiddleware: {
    createItem: (newItemData: ItemSchemaTypes) => Promise<ServiceResponseType>;
    getItemList: (itemTitle: string) => Promise<ServiceResponseType>;
};
export default searchMiddleware;
//# sourceMappingURL=searchMiddleware.d.ts.map