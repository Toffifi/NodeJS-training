export const PostItemSchema = {
  type: 'object',
  required: ['price', 'name', 'categoryId'],
  properties: {
    price: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    categoryId: {
      type: 'string',
    },
  },
};
