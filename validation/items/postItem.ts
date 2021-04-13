import Joi from 'joi';

export const PostItemSchema: Joi.ObjectSchema = Joi.object().keys({
  price: Joi.number().min(0).required(),
  name: Joi.string().required(),
  categoryId: Joi.string().required(),
});
