export const PutCategorySchema = {
  type: 'object',
  required: ['id', 'name'],
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
};
