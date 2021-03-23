import { mockData, deleteItem, updateItem } from '../data/mockData.js';

export const getAll = (req, res) => {
  res.json(mockData);
};

export const create = (req, res) => {
  if (req.body.price && req.body.name) {
    const newItem = {
      id: Date.now().toString(),
      ...req.body,
    };
    mockData.push(newItem);
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
  const item = mockData.find((item) => item.id === req.params.id);

  if (!item) {
    res.status(404);
  }

  res.json(item);
};

export const update = (req, res) => {
  const item = updateItem(req.params.id, req.body);

  if (!item) {
    res.status(404);
  }

  res.status(202).json(item);
};
