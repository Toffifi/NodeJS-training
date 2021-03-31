import { MockData } from '../interfaces';

export let mockData: MockData = {
  items: [
    {
      id: '1',
      name: 'Brow primer',
      price: 1.0,
      categoryId: '1',
    },
    {
      id: '2',
      name: 'Brow pencil',
      price: 10.0,
      categoryId: '1',
    },
    {
      id: '3',
      name: 'Eye shadow',
      price: 20.0,
      categoryId: '2',
    },
    {
      id: '4',
      name: 'Mascara',
      price: 1.5,
      categoryId: '2',
    },
  ],
  categories: [
    {
      id: '1',
      name: 'Brows',
    },
    {
      id: '2',
      name: 'Eyes',
    },
  ],
};
