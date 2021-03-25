import { Item, MockData } from '../interfaces';

export let mockData: MockData = {
  items: [
    {
      id: 1,
      name: 'Brow primer',
      price: 1.0,
      categoryId: 1,
    },
    {
      id: 2,
      name: 'Brow pencil',
      price: 10.0,
      categoryId: 1,
    },
    {
      id: 3,
      name: 'Eye shadow',
      price: 20.0,
      categoryId: 2,
    },
    {
      id: 4,
      name: 'Mascara',
      price: 1.5,
      categoryId: 2,
    },
  ],
  categories: [
    {
      id: 1,
      name: 'Brows',
    },
    {
      id: 2,
      name: 'Eyes',
    },
  ],
};

export const deleteItem = (id: number): void => {
  mockData.items = mockData.items.filter((item) => item.id !== id);
};

export const updateItem = (
  id: number,
  req: { name: string; price: number }
): Item | null => {
  const item = mockData.items.find((i: Item) => i.id === id);

  if (!item) {
    return null;
  }

  item.name = req.name;
  item.price = req.price;
  return item;
};
