import express from 'express';

import { InternalError } from '../errors';
import { Category } from '../interfaces';
import CategoryModel from '../models/category';
import errorHandler from '../utils/errorHandler';

export const getAll = (req: express.Request, res: express.Response): void => {
  CategoryModel.find({
    isDeleted: false,
  })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      res.status(error.code).json(error);
    });
};

export const create = (req: express.Request, res: express.Response): void => {
  const category: Category = new CategoryModel({
    name: req.body.name,
    isDeleted: false,
  });

  category
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      res.status(error.code).json(error);
    });
};

export const remove = (req: express.Request, res: express.Response): void => {
  CategoryModel.updateOne(
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
  getCategory(req.params.id)
    .then((result) => {
      if (!result) {
        throw new InternalError(
          `Category with id '${req.body.id}' not found`,
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
  const updatedCategory: { name: string } = {
    name: req.body.name,
  };

  CategoryModel.updateOne(
    {
      _id: req.body.id,
      isDeleted: false,
    },
    updatedCategory
  )
    .then(() => {
      return getCategory(req.body.id);
    })
    .then((result) => {
      if (!result) {
        throw new InternalError(
          `Category with id '${req.body.id}' not found`,
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

const getCategory = (id: string): Promise<Category> => {
  return CategoryModel.findOne({
    _id: id,
    isDeleted: false,
  }).exec();
};
