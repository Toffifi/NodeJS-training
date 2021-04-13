import Joi from 'joi';

export const PostCategorySchema: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string().required(),
});
