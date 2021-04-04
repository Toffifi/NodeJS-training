import { Category } from 'data/models/category';
import {
  FilterQuery,
  MatchKeysAndValues,
  ObjectId,
  OptionalId,
  WithId,
} from 'mongodb';

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

export const update = async (
  id: string,
  name: string,
  categoryId: string,
  price: number
) => {
  if (!price || !name || !categoryId || !id) {
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

  const updatedItem: MatchKeysAndValues<Item> = {
    name,
    categoryId,
    price,
  };
  const result = await dbClient.update<Item>(
    Collections.Items,
    {
      _id: new ObjectId(id),
      isDeleted: false,
    },
    updatedItem
  );

  if (!result && !result.result.ok) {
    return {
      isSuccessful: false,
      error: 'Error while updating item',
    };
  }

  return {
    isSuccessful: true,
  };
};

export const remove = async (id: string) => {
  const result = await dbClient.update<Item>(
    Collections.Items,
    {
      _id: new ObjectId(id),
    },
    { isDeleted: true }
  );

  if (!result && !result.result.ok) {
    return {
      isSuccessful: false,
      error: 'Error while deleting item',
    };
  }

  return {
    isSuccessful: true,
  };
};
