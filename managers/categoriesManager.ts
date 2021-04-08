import {
  FilterQuery,
  MatchKeysAndValues,
  ObjectId,
  OptionalId,
  UpdateWriteOpResult,
  WithId,
} from 'mongodb';

import { Collections } from '../data/enums/collections';
import * as dbClient from '../data/makeupStoreClient';
import { Category } from '../data/models/category';
import { ConflictError, NotFoundError } from '../errors';

export const getAll = async () => {
  const query: FilterQuery<Category> = {
    isDeleted: false,
  };

  try {
    return await dbClient.get<Category>(Collections.Categories, query);
  } catch {
    throw new NotFoundError();
  }
};

export const getById = async (id: string): Promise<Category> => {
  try {
    return await dbClient.getOne<Category>(Collections.Categories, {
      _id: new ObjectId(id),
      isDeleted: false,
    });
  } catch {
    throw new NotFoundError();
  }
};

export const create = async (name: string): Promise<WithId<Category>> => {
  const existingCategories = await dbClient.get(Collections.Categories, {
    name,
    isDeleted: false,
  });

  if (existingCategories.length) {
    throw new ConflictError('Category with this name already exists');
  }

  const category: OptionalId<Category> = {
    name,
    isDeleted: false,
  };
  return await dbClient.add<Category>(Collections.Categories, category);
};

export const update = async (
  id: string,
  name: string
): Promise<UpdateWriteOpResult> => {
  const updatedCategory: MatchKeysAndValues<Category> = {
    name,
  };

  try {
    return await dbClient.update<Category>(
      Collections.Categories,
      {
        _id: new ObjectId(id),
        isDeleted: false,
      },
      updatedCategory
    );
  } catch {
    throw new NotFoundError();
  }
};

export const remove = async (id: string): Promise<UpdateWriteOpResult> => {
  try {
    return await dbClient.update<Category>(
      Collections.Categories,
      {
        _id: new ObjectId(id),
      },
      { isDeleted: true }
    );
  } catch {
    throw new NotFoundError();
  }
};
