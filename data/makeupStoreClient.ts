import {
  FilterQuery,
  MatchKeysAndValues,
  MongoClient,
  OptionalId,
  UpdateWriteOpResult,
  WithId,
} from 'mongodb';

import { NotFoundError, ServerError } from '../errors';
import { Collections } from './enums/collections';

let mongoClient: MongoClient;

const initialize = () => {
  mongoClient = new MongoClient('mongodb://localhost:27017/', {
    useUnifiedTopology: true,
  });

  mongoClient.connect();
};

const close = () => {
  mongoClient.close();
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
    if (newItem.ops.length) {
      return newItem.ops[0];
    } else {
      throw new NotFoundError();
    }
  } catch {
    throw new ServerError();
  }
};

const getOne = async <T>(
  collection: Collections,
  query: FilterQuery<T>
): Promise<T> => {
  try {
    const items = await get(collection, query);
    if (items.length) {
      return items[0];
    } else {
      throw new NotFoundError();
    }
  } catch {
    throw new ServerError();
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
    throw new ServerError();
  }
};

const update = async <T>(
  collection: Collections,
  query: FilterQuery<T>,
  updateQuery: MatchKeysAndValues<T>
): Promise<UpdateWriteOpResult> => {
  try {
    const updateResult = await mongoClient
      .db('makeupStoreDb')
      .collection<T>(collection)
      .updateOne(query, {
        $set: updateQuery,
      });
    return updateResult;
  } catch {
    throw new ServerError();
  }
};

export { initialize, close, add, get, getOne, update };
