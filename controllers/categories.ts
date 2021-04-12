import { Collections } from '../enums/collections';
import { ConflictError } from '../errors';
import express from 'express';
import { Category } from '../interfaces';
import { FilterQuery, MatchKeysAndValues, ObjectId, OptionalId } from 'mongodb';

import * as dbClient from '../services/makeupStoreClient';

export const getAll = (req: express.Request, res: express.Response): void => {
  const query: FilterQuery<Category> = {
    isDeleted: false,
  };
  dbClient
    .get<Category>(Collections.Category, query)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(err.code).json(err.message);
    });
};

export const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const existingCategories = await dbClient.get(Collections.Category, {
    name: req.body.name,
    isDeleted: false,
  });

  if (existingCategories.length) {
    throw new ConflictError('Category with this name already exists');
  }

  const category: OptionalId<Category> = {
    name: req.body.name,
    isDeleted: false,
  };

  dbClient
    .add<Category>(Collections.Category, category)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(err.code).json(err.message);
    });
};

export const remove = (req: express.Request, res: express.Response): void => {
  dbClient
    .remove<Category>(
      Collections.Category,
      {
        _id: new ObjectId(req.params.id),
      },
      { isDeleted: true }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(err.code).json(err.message);
    });
};

export const get = (req: express.Request, res: express.Response): void => {
  dbClient
    .getOne<Category>(Collections.Category, {
      _id: new ObjectId(req.params.id),
      isDeleted: false,
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(err.code).json(err.message);
    });
};

export const update = (req: express.Request, res: express.Response): void => {
  const updatedCategory: MatchKeysAndValues<Category> = {
    name: req.body.name,
  };
  dbClient
    .update<Category>(
      Collections.Category,
      {
        _id: new ObjectId(req.body.id),
        isDeleted: false,
      },
      updatedCategory
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(err.code).json(err.message);
    });
};
