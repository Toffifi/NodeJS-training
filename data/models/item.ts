import { BaseModel } from './baseModel';

export interface Item extends BaseModel {
  name: string;
  price: number;
  categoryId: string;
  isDeleted: boolean;
}
