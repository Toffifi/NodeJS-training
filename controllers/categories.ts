import express from 'express';

import * as manager from '../managers/categoriesManager';

export const getAll = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const result = await manager.getAll();
  if (!result.isSuccessful) {
    res.status(400).json(result.error);
  }

  res.status(200).json(result.data);
};

export const create = async (req: express.Request, res: express.Response) => {
  const result = await manager.create(req.body.name);

  if (!result.isSuccessful) {
    res.status(400).json(result.error);
  }

  res.status(201).json(result.data);
};

// export const remove = (req: express.Request, res: express.Response): void => {
//   deleteItem(req.params.id);
//   res.status(204).json({ message: 'Item has been removed.' });
// };

export const get = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const result = await manager.getById(req.params.id);

  if (!result.isSuccessful) {
    res.status(400).json(result.error);
  }

  res.status(201).json(result.data);
};

// export const update = (req: express.Request, res: express.Response): void => {
//   if (req.body.price && req.body.name) {
//     const item = updateItem(req.params.id, req.body);

//     if (!item) {
//       res.status(404);
//     }

//     res.status(202).json(item);
//   } else {
//     res.status(400);
//   }
// };
