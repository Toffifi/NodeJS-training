import express from 'express';

import { NotFoundError } from '../utils/errors';
import { Category } from '../interfaces';
import CategoryModel from '../models/category';
import errorHandler from '../utils/errorHandler';

export const getAll = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const result = await CategoryModel.find({ isDeleted: false }).exec();
    res.status(200).json(result);
  } catch (err) {
    const error = errorHandler(err);
    res.status(error.code).json(error);
  }
};

export const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const category: Category = new CategoryModel({
      name: req.body.name,
      isDeleted: false,
    });

    const result = await category.save();
    res.status(201).json(result);
  } catch (err) {
    const error = errorHandler(err);
    res.status(error.code).json(error);
  }
};

export const remove = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const result = await CategoryModel.updateOne(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      }
    );
    res.status(202).json('Item was deleted');
  } catch (err) {
    const error = errorHandler(err);
    res.status(error.code).json(error);
  }
};

export const get = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const result = await getCategory(req.params.id);
    if (!result) {
      throw new NotFoundError(`Category with id '${req.body.id}' not found`);
    }
    res.status(200).json(result);
  } catch (err) {
    const error = errorHandler(err);
    res.status(error.code).json(error);
  }
};

export const update = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const categoryParams: { name: string } = {
      name: req.body.name,
    };

    await CategoryModel.updateOne(
      {
        _id: req.body.id,
        isDeleted: false,
      },
      categoryParams
    );

    const updatedCategory = await getCategory(req.body.id);
    if (!updatedCategory) {
      throw new NotFoundError(`Category with id '${req.body.id}' not found`);
    }
    res.status(202).json(updatedCategory);
  } catch (err) {
    const error = errorHandler(err);
    res.status(error.code).json(error);
  }
};

const getCategory = (id: string): Promise<Category> => {
  return CategoryModel.findOne({
    _id: id,
    isDeleted: false,
  }).exec();
};
