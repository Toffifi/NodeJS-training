import express from 'express';
import { mockData, deleteItem, updateItem } from '../data/mockData';
import { Item } from '../interfaces';
import * as manager from '../managers/itemsManager';

export const getAll = (req: express.Request, res: express.Response) => {
  res.json(mockData.items);
};

export const create = async (req: express.Request, res: express.Response) => {
  if (req.body.price && req.body.name) {
    const item = await manager.create(
      req.body.name,
      req.body.categoryId,
      req.body.price
    );
    res.status(201).json(item);
  } else {
    res.status(400);
  }
};

export const remove = (req: express.Request, res: express.Response) => {
  deleteItem(req.params.id);
  res.status(204).json({ message: 'Item has been removed.' });
};

export const get = (req: express.Request, res: express.Response) => {
  const item = mockData.items.find((i) => i.id === req.params.id);
  if (!item) {
    res.status(404);
  }
  res.json(item);
};

export const update = (req: express.Request, res: express.Response) => {
  if (req.body.price && req.body.name) {
    const item: Item | null = updateItem(req.params.id, req.body);
    if (!item) {
      res.status(404);
    }
    res.status(202).json(item);
  } else {
    res.status(400);
  }
};
