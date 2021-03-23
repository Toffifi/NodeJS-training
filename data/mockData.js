export let mockData = [
  {
    id: '1',
    name: 'Mascara',
    price: '1.00',
  },
  {
    id: '2',
    name: 'Powder',
    price: '10.00',
  },
  {
    id: '3',
    name: 'Eye shadow',
    price: '20.00',
  },
  {
    id: '4',
    name: 'Brow pencil',
    price: '1.50',
  },
];

export const deleteItem = (id) => {
  mockData = mockData.filter((item) => item.id !== id);
};

export const updateItem = (id, req) => {
  const item = mockData.find((item) => item.id === id);

  if (!item) {
    return null;
  }

  item.name = req.name;
  item.price = req.price;
  return item;
};
