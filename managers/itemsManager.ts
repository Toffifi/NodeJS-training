import { WithId } from 'mongodb';
import * as dbClient from '../data/makeupStoreClient';
import { Item } from '../data/models/item';

export const getAll = async () => {};

export const getById = (id: number) => {};

export const getByCategory = (categoryId: number) => {};

export const create = async (
  name: string,
  categoryId: string,
  price: number
): Promise<WithId<Item>> => {
  const item: Item = {
    name,
    categoryId,
    price,
  };
  try {
    await dbClient.connect();
    const newItem = await dbClient.itemsCollection().insertOne(item);
    return newItem.ops.length ? newItem.ops[0] : null;
  } finally {
    await dbClient.closeConnection();
  }
};

export const update = () => {};

export const remove = (id: number) => {};
