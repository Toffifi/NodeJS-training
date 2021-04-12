import mongoose from 'mongoose';

export interface Item extends mongoose.Document {
  name: string;
  price: number;
  categoryId: string;
  isDeleted: boolean;
}
