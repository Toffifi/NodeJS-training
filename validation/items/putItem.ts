import Joi from 'joi';

export const PutItemSchema: Joi.ObjectSchema = Joi.object().keys({
  id: Joi.string().required(),
  price: Joi.number().min(0).required(),
  name: Joi.string().required(),
  categoryId: Joi.string().required(),
});
