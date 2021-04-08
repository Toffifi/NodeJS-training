import { Result } from 'interfaces/result';
import {
  FilterQuery,
  MatchKeysAndValues,
  ObjectId,
  OptionalId,
  WithId,
} from 'mongodb';

import { Collections } from '../data/enums/collections';
import * as dbClient from '../data/makeupStoreClient';
import { Category } from '../data/models/category';

export const getAll = async () => {
  const query: FilterQuery<Category> = {
    isDeleted: false,
  };

  const categories = await dbClient.get<Category>(
    Collections.Categories,
    query
  );

  if (!categories) {
    return {
      isSuccessful: false,
      error: 'Error while getting all categories',
    };
  }

  return {
    isSuccessful: true,
    data: categories,
  };
};

export const getById = async (id: string): Promise<Result<Category>> => {
  const item = await dbClient.getOne<Category>(Collections.Categories, {
    _id: new ObjectId(id),
    isDeleted: false,
  });

  return {
    isSuccessful: true,
    data: item,
  };
};

export const create = async (
  name: string
): Promise<Result<WithId<Category>>> => {
  const existingCategories = await dbClient.get(Collections.Categories, {
    name,
    isDeleted: false,
  });

  if (existingCategories.length) {
    return {
      isSuccessful: false,
      error: 'Category with this name already exists',
    };
  }

  const category: OptionalId<Category> = {
    name,
    isDeleted: false,
  };
  const newCategory = await dbClient.add<Category>(
    Collections.Categories,
    category
  );
  if (!newCategory) {
    return {
      isSuccessful: false,
      error: 'Error while saving new category',
    };
  }

  return {
    isSuccessful: true,
    data: newCategory,
  };
};

export const update = async (id: string, name: string) => {
  const updatedCategory: MatchKeysAndValues<Category> = {
    name,
  };
  const result = await dbClient.update<Category>(
    Collections.Categories,
    {
      _id: new ObjectId(id),
      isDeleted: false,
    },
    updatedCategory
  );

  if (!result && !result.result.ok) {
    return {
      isSuccessful: false,
      error: 'Error while updating category',
    };
  }

  return {
    isSuccessful: true,
  };
};

export const remove = async (id: string) => {
  const result = await dbClient.update<Category>(
    Collections.Categories,
    {
      _id: new ObjectId(id),
    },
    { isDeleted: true }
  );

  if (!result && !result.result.ok) {
    return {
      isSuccessful: false,
      error: 'Error while deleting category',
    };
  }

  return {
    isSuccessful: true,
  };
};
