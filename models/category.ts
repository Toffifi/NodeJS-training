import mongoose from 'mongoose';

import { Collections } from '../enums/collections';
import { Category } from '../interfaces';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const CategoryModel: mongoose.Model<Category, {}> = mongoose.model<Category>(
  Collections.Category,
  CategorySchema
);
export default CategoryModel;
