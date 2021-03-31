import { Result } from 'interfaces/result';
import { FilterQuery, ObjectId, OptionalId, WithId } from 'mongodb';

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
  if (!id) {
    return {
      isSuccessful: false,
      error: 'Bad request',
    };
  }
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
  if (!name) {
    return {
      isSuccessful: false,
      error: 'Bad request',
    };
  }

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
