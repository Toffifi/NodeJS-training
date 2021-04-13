import express from 'express';

import { InternalError } from '../errors';
import { Item, ItemUpdate } from '../interfaces';
import CategoryModel from '../models/category';
import ItemModel from '../models/item';
import errorHandler from '../utils/errorHandler';

export const getAll = (req: express.Request, res: express.Response): void => {
  const query: { isDeleted: boolean; categoryId?: string } = {
    isDeleted: false,
  };

  const categoryId: string = req.query.categoryId?.toString();

  if (categoryId) {
    query.categoryId = categoryId;
  }

  checkCategory(categoryId)
    .then((result) => {
      if (!result) {
        throw new InternalError(
          `Category ${req.body.categoryId} not found`,
          'ObjectNotFound'
        );
      }
      return ItemModel.find(query).exec();
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      res.status(error.code).json(error);
    });
};

export const create = (req: express.Request, res: express.Response): void => {
  checkCategory(req.body.categoryId)
    .then((result) => {
      if (!result) {
        throw new InternalError(
          `Category ${req.body.categoryId} not found`,
          'ObjectNotFound'
        );
      }
      const item: Item = new ItemModel({
        name: req.body.name,
        categoryId: req.body.categoryId,
        price: req.body.price,
        isDeleted: false,
      });
      return item.save();
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      res.status(error.code).json(error);
    });
};

export const remove = (req: express.Request, res: express.Response): void => {
  ItemModel.updateOne(
    {
      _id: req.params.id,
      isDeleted: false,
    },
    {
      isDeleted: true,
    }
  )
    .then(() => {
      res.status(202).json('Item was deleted');
    })
    .catch((err) => {
      const error = errorHandler(err);
      res.status(error.code).json(error);
    });
};

export const get = (req: express.Request, res: express.Response): void => {
  getItem(req.params.id)
    .then((result) => {
      if (!result) {
        throw new InternalError(
          `Item with id '${req.body.id}' not found`,
          'ObjectNotFound'
        );
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      res.status(error.code).json(error);
    });
};

export const update = (req: express.Request, res: express.Response): void => {
  checkCategory(req.body.categoryId)
    .then((result) => {
      if (!result) {
        throw new InternalError(
          `Category with id '${req.body.categoryId}' not found`,
          'ObjectNotFound'
        );
      }
    })
    .then(() => {
      const updatedItem: ItemUpdate = {
        name: req.body.name,
        categoryId: req.body.categoryId,
        price: req.body.price,
        isDeleted: false,
      };
      return ItemModel.updateOne(
        {
          _id: req.body.id,
          isDeleted: false,
        },
        updatedItem
      );
    })
    .then(() => {
      return getItem(req.body.id);
    })
    .then((result) => {
      if (!result) {
        throw new InternalError(
          `Item with id '${req.body.id}' not found`,
          'ObjectNotFound'
        );
      }
      res.status(202).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      res.status(error.code).json(error);
    });
};

const getItem = (id: string): Promise<Item> => {
  return ItemModel.findOne({
    _id: id,
    isDeleted: false,
  }).exec();
};

const checkCategory = (id: string): Promise<boolean> => {
  return id
    ? CategoryModel.exists({
        _id: id,
        isDeleted: false,
      })
    : new Promise(() => true);
};
