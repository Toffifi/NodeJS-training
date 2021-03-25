import express from 'express';
import { mockData, deleteItem, updateItem } from '../data/mockData';

export const getAll = (req: express.Request, res: express.Response): void => {
  res.json(mockData.categories);
};

export const create = async (req: express.Request, res: express.Response) => {
  if (req.body.price && req.body.name) {
    const newItem = {
      id: Date.now().toString(),
      ...req.body,
    };
    mockData.categories.push(newItem);
    res.status(201).json(newItem);
  } else {
    res.status(400);
  }
};

export const remove = (req: express.Request, res: express.Response): void => {
  deleteItem(req.params.id);
  res.status(204).json({ message: 'Item has been removed.' });
};

export const get = (req: express.Request, res: express.Response): void => {
  const item = mockData.categories.find((i) => item.id === req.params.id);

  if (!item) {
    res.status(404);
  }

  res.json(item);
};

export const update = (req: express.Request, res: express.Response): void => {
  if (req.body.price && req.body.name) {
    const item = updateItem(req.params.id, req.body);

    if (!item) {
      res.status(404);
    }

    res.status(202).json(item);
  } else {
    res.status(400);
  }
};
