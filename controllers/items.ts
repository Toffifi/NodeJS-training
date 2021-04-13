import express from 'express';
import { Item, ItemUpdate } from '../interfaces';
import ItemModel from '../models/item';
import { errorHandler } from '../utils';

export const getAll = (req: express.Request, res: express.Response): void => {
  const query: { isDeleted: boolean; categoryId?: string } = {
    isDeleted: false,
  };

  const categoryId: string = req.query.categoryid?.toString();

  if (categoryId) {
    query.categoryId = categoryId;
  }

  ItemModel.find(query)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      console.log('getAllItem', error);
      res.status(error.code).json(error.message);
    });
};

export const create = (req: express.Request, res: express.Response): void => {
  const item: Item = new ItemModel({
    name: req.body.name,
    categoryId: req.body.categoryId,
    price: req.body.price,
    isDeleted: false,
  });
  item
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      console.log('createItem', error);
      res.status(error.code).json(error.message);
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
      console.log('removeItem', error);
      res.status(error.code).json(error.message);
    });
};

export const get = (req: express.Request, res: express.Response): void => {
  getItem(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      console.log('getItem', error);
      res.status(error.code).json(error.message);
    });
};

export const update = (req: express.Request, res: express.Response): void => {
  const updatedItem: ItemUpdate = {
    name: req.body.name,
    categoryId: req.body.categoryId,
    price: req.body.price,
    isDeleted: false,
  };

  ItemModel.updateOne(
    {
      _id: req.body.id,
      isDeleted: false,
    },
    updatedItem
  )
    .then(() => {
      return getItem(req.body.id);
    })
    .then((result) => {
      res.status(202).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      console.log('updateItem', error);
      res.status(error.code).json(error.message);
    });
};

const getItem = (id: string): Promise<Item> => {
  return ItemModel.findOne({
    _id: id,
    isDeleted: false,
  }).exec();
};
