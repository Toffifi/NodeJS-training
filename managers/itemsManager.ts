import { Category } from 'data/models/category';
import { FilterQuery, ObjectId, OptionalId, WithId } from 'mongodb';

import { Collections } from '../data/enums/collections';
import * as dbClient from '../data/makeupStoreClient';
import { Item } from '../data/models/item';
import { Result } from '../interfaces/result';

export const getAll = async (categoryId: string) => {
  const query: FilterQuery<Item> = {
    isDeleted: false,
  };

  if (categoryId) {
    query.categoryId = categoryId;
  }

  const items = await dbClient.get<Item>(Collections.Items, query);

  if (!items) {
    return {
      isSuccessful: false,
      error: 'Error while getting all items',
    };
  }

  return {
    isSuccessful: true,
    data: items,
  };
};

export const getById = async (id: string): Promise<Result<Item>> => {
  if (!id) {
    return {
      isSuccessful: false,
      error: 'Bad request',
    };
  }
  const item = await dbClient.getOne<Item>(Collections.Items, {
    _id: new ObjectId(id),
    isDeleted: false,
  });

  return {
    isSuccessful: true,
    data: item,
  };
};

export const create = async (
  name: string,
  categoryId: string,
  price: number
): Promise<Result<WithId<Item>>> => {
  if (!price || !name || !categoryId) {
    return {
      isSuccessful: false,
      error: 'Bad request',
    };
  }

  const category = await dbClient.getOne<Category>(Collections.Categories, {
    _id: new ObjectId(categoryId),
    isDeleted: false,
  });

  if (!category) {
    return {
      isSuccessful: false,
      error: 'Category not found',
    };
  }

  const item: OptionalId<Item> = {
    name,
    categoryId,
    price,
    isDeleted: false,
  };
  const newItem = await dbClient.add<Item>(Collections.Items, item);

  if (!newItem) {
    return {
      isSuccessful: false,
      error: 'Error while saving new item',
    };
  }

  return {
    isSuccessful: true,
    data: newItem,
  };
};

export const update = () => {};

export const remove = (id: number) => {};
