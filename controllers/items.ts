import express from 'express';

import * as manager from '../managers/itemsManager';

export const getAll = (req: express.Request, res: express.Response): void => {
  manager
    .getAll(req.query.categoryid?.toString())
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(err.code).json(err.message);
    });
};

export const create = (req: express.Request, res: express.Response): void => {
  manager
    .create(req.body.name, req.body.categoryId, req.body.price)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(err.code).json(err.message);
    });
};

export const remove = (req: express.Request, res: express.Response): void => {
  manager
    .remove(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(err.code).json(err.message);
    });
};

export const get = (req: express.Request, res: express.Response): void => {
  manager
    .getById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(err.code).json(err.message);
    });
};

export const update = (req: express.Request, res: express.Response): void => {
  manager
    .update(req.body.id, req.body.name, req.body.categoryId, req.body.price)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(err.code).json(err.message);
    });
};
