import Joi from 'joi';

export const PutCategorySchema: Joi.ObjectSchema = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string().required(),
});
