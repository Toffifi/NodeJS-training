export const PutItemSchema = {
  type: 'object',
  required: ['id', 'price', 'name', 'categoryId'],
  properties: {
    id: {
      type: 'string',
    },
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
