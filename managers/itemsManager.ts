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
import { NotFoundError } from '../errors';

export const getAll = async (categoryId: string) => {
  const query: FilterQuery<Item> = {
    isDeleted: false,
  };

  if (categoryId) {
    query.categoryId = categoryId;
  }

  try {
    return await dbClient.get<Item>(Collections.Items, query);
  } catch {
    throw new NotFoundError();
  }
};

export const getById = async (id: string): Promise<Item> => {
  try {
    return await dbClient.getOne<Item>(Collections.Items, {
      _id: new ObjectId(id),
      isDeleted: false,
    });
  } catch {
    throw new NotFoundError();
  }
};

export const create = async (
  name: string,
  categoryId: string,
  price: number
): Promise<WithId<Item>> => {
  try {
    dbClient.getOne<Category>(Collections.Categories, {
      _id: new ObjectId(categoryId),
      isDeleted: false,
    });
  } catch {
    throw new NotFoundError();
  }

  const item: OptionalId<Item> = {
    name,
    categoryId,
    price,
    isDeleted: false,
  };
  return await dbClient.add<Item>(Collections.Items, item);
};

export const update = async (
  id: string,
  name: string,
  categoryId: string,
  price: number
) => {
  try {
    await dbClient.getOne<Category>(Collections.Categories, {
      _id: new ObjectId(categoryId),
      isDeleted: false,
    });
  } catch {
    throw new NotFoundError();
  }

  const updatedItem: MatchKeysAndValues<Item> = {
    name,
    categoryId,
    price,
  };

  try {
    return await dbClient.update<Item>(
      Collections.Items,
      {
        _id: new ObjectId(id),
        isDeleted: false,
      },
      updatedItem
    );
  } catch {
    throw new NotFoundError();
  }
};

export const remove = async (id: string) => {
  try {
    return await dbClient.update<Item>(
      Collections.Items,
      {
        _id: new ObjectId(id),
      },
      { isDeleted: true }
    );
  } catch {
    throw new NotFoundError();
  }
};
