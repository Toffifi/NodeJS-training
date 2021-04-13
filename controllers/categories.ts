import express from 'express';
import { errorHandler } from '../utils';
import { Category } from '../interfaces';

import CategoryModel from '../models/category';

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
      console.log('getAllCategory', error);
      res.status(error.code).json(error.message);
    });
};

export const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
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
      console.log('createCategory', error);
      res.status(error.code).json(error.message);
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
      console.log('removeCategory', error);
      res.status(error.code).json(error.message);
    });
};

export const get = (req: express.Request, res: express.Response): void => {
  getCategory(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      console.log('getCategory', error);
      res.status(error.code).json(error.message);
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
      res.status(202).json(result);
    })
    .catch((err) => {
      const error = errorHandler(err);
      console.log('updateCategory', error);
      res.status(error.code).json(error.message);
    });
};

const getCategory = (id: string): Promise<Category> => {
  return CategoryModel.findOne({
    _id: id,
    isDeleted: false,
  }).exec();
};
