import express from 'express';

import { NotFoundError } from '../utils/errors';
import { Item, ItemUpdate } from '../interfaces';
import CategoryModel from '../models/category';
import ItemModel from '../models/item';
import errorHandler from '../utils/errorHandler';

export const getAll = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const query: { isDeleted: boolean; categoryId?: string } = {
      isDeleted: false,
    };

    const categoryId: string = req.query.categoryId?.toString();

    if (categoryId) {
      const isValidCategory = await checkCategory(categoryId);
      if (!isValidCategory) {
        throw new NotFoundError(`Category ${req.body.categoryId} not found`);
      }
      query.categoryId = categoryId;
    }

    const result = await ItemModel.find(query).exec();
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
    const isValidCategory = await checkCategory(req.body.categoryId);

    if (!isValidCategory) {
      throw new NotFoundError(`Category ${req.body.categoryId} not found`);
    }

    const item: Item = new ItemModel({
      name: req.body.name,
      categoryId: req.body.categoryId,
      price: req.body.price,
      isDeleted: false,
    });
    const result = await item.save();

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
    await ItemModel.updateOne(
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
    const result = await getItem(req.params.id);
    if (!result) {
      throw new NotFoundError(`Item with id '${req.body.id}' not found`);
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
    const isValidCategory = await checkCategory(req.body.categoryId);
    if (!isValidCategory) {
      throw new NotFoundError(
        `Category with id '${req.body.categoryId}' not found`
      );
    }

    const itemParams: ItemUpdate = {
      name: req.body.name,
      categoryId: req.body.categoryId,
      price: req.body.price,
      isDeleted: false,
    };
    await ItemModel.updateOne(
      {
        _id: req.body.id,
        isDeleted: false,
      },
      itemParams
    );

    const updatedItem = await getItem(req.body.id);
    if (!updatedItem) {
      throw new NotFoundError(`Item with id '${req.body.id}' not found`);
    }
    res.status(202).json(updatedItem);
  } catch (err) {
    const error = errorHandler(err);
    res.status(error.code).json(error);
  }
};

const getItem = (id: string): Promise<Item> => {
  return ItemModel.findOne({
    _id: id,
    isDeleted: false,
  }).exec();
};

const checkCategory = (id: string): Promise<boolean> => {
  return CategoryModel.exists({
    _id: id,
    isDeleted: false,
  });
};
