import express from 'express';

import * as manager from '../managers/itemsManager';

export const getAll = async (req: express.Request, res: express.Response) => {
  const result = await manager.getAll(req.query.categoryid?.toString());
  if (!result.isSuccessful) {
    res.status(400).json(result.error);
  }

  res.status(200).json(result.data);
};

export const create = async (req: express.Request, res: express.Response) => {
  const result = await manager.create(
    req.body.name,
    req.body.categoryId,
    req.body.price
  );

  if (!result.isSuccessful) {
    res.status(400).json(result.error);
  }

  res.status(201).json(result.data);
};

export const remove = async (req: express.Request, res: express.Response) => {
  const result = await manager.remove(req.params.id);

  if (!result.isSuccessful) {
    res.status(400).json(result.error);
  }

  res.status(204).json();
};

export const get = async (req: express.Request, res: express.Response) => {
  const result = await manager.getById(req.params.id);

  if (!result.isSuccessful) {
    res.status(400).json(result.error);
  }

  res.status(201).json(result.data);
};

export const update = async (req: express.Request, res: express.Response) => {
  const result = await manager.update(
    req.body.id,
    req.body.name,
    req.body.categoryId,
    req.body.price
  );

  if (!result.isSuccessful) {
    res.status(400).json(result.error);
  }

  res.status(200).json();
};
