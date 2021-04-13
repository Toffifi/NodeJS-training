import express from 'express';
import { ApiError } from 'interfaces';
import Joi from 'joi';

const validate = (schema: Joi.ObjectSchema<any>) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { error } = schema.validate(req.body);

    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      const requestError: ApiError = {
        code: 400,
        name: 'BAD_REQUEST',
        message,
      };
      res.status(requestError.code).json(requestError);
    }
  };
};

export default validate;
