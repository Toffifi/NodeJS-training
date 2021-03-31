import { FilterQuery, MongoClient, OptionalId, WithId } from 'mongodb';

import { Collections } from './enums/collections';

let mongoClient: MongoClient;

const initialize = () => {
  mongoClient = new MongoClient('mongodb://localhost:27017/', {
    useUnifiedTopology: true,
  });

  mongoClient.connect();
};

const add = async <T>(
  collection: Collections,
  item: OptionalId<T>
): Promise<WithId<T>> => {
  try {
    const newItem = await mongoClient
      .db('makeupStoreDb')
      .collection<T>(collection)
      .insertOne(item);
    return newItem.ops.length ? newItem.ops[0] : null;
  } catch {
    return null;
  }
};

const getOne = async <T>(
  collection: Collections,
  query: FilterQuery<T>
): Promise<T> => {
  try {
    const items = await get(collection, query);

    return items.length ? items[0] : null;
  } catch {
    return null;
  }
};

const get = async <T>(
  collection: Collections,
  query: FilterQuery<T>
): Promise<T[]> => {
  try {
    return await mongoClient
      .db('makeupStoreDb')
      .collection<T>(collection)
      .find(query)
      .toArray();
  } catch {
    return null;
  }
};

export { initialize, add, get, getOne };
