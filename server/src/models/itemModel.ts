import mongoose from 'mongoose';

export interface ItemSchemaTypes {
  itemImage: string;
  itemTitle: string;
  itemDescription: string;
  itemLike: number;
}

const itemSchema = new mongoose.Schema<ItemSchemaTypes>({
  itemImage: { type: String },
  itemTitle: { type: String },
  itemDescription: { type: String },
  itemLike: { type: Number },
});

itemSchema.index({ itemTitle: 'text' });
const ItemModel = mongoose.model('Item', itemSchema);

export default ItemModel;
