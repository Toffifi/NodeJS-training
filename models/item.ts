import { Item } from 'interfaces';
import mongoose from 'mongoose';

import { Collections } from '../enums/collections';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const ItemModel: mongoose.Model<Item, {}> = mongoose.model<Item>(
  Collections.Item,
  ItemSchema
);
export default ItemModel;
