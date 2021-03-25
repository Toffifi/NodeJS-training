import { mockData, deleteItem, updateItem } from '../data/mockData';
import { Item } from '../interfaces';

export const getAll = (req, res) => {
  res.json(mockData.items);
};

export const create = (req, res) => {
  if (req.body.price && req.body.name) {
    const newItem: Item = {
      id: Date.now().toString(),
      ...req.body,
    };
    mockData.items.push(newItem);
    res.status(201).json(newItem);
  } else {
    res.status(400);
  }
};

export const remove = (req, res) => {
  deleteItem(req.params.id);
  res.status(204).json({ message: 'Item has been removed.' });
};

export const get = (req, res) => {
  const item = mockData.items.find((i) => i.id === req.params.id);

  if (!item) {
    res.status(404);
  }

  res.json(item);
};

export const update = (req, res) => {
  if (req.body.price && req.body.name) {
    const item: Item | null = updateItem(req.params.id, req.body);

    if (!item) {
      res.status(404);
    }

    res.status(202).json(item);
  } else {
    res.status(400);
  }
};
