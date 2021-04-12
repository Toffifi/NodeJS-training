import {
  FilterQuery,
  MatchKeysAndValues,
  MongoClient,
  OptionalId,
  UpdateWriteOpResult,
  WithId,
} from 'mongodb';

import { NotFoundError, ServerError } from '../errors';
import { Collections } from '../enums/collections';
import mongoose from 'mongoose';

const schemes: Map<Collections, mongoose.Model<any, {}>> = new Map();

const initialize = (url: string, dbName: string) => {
  mongoose.connect(`mongodb://${url}/${dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 3000,
  });
};

const close = () => {
  mongoose.disconnect();
};

const add = async <T extends mongoose.Document>(
  collection: Collections,
  item: T
): Promise<T> => {
  const Model: mongoose.Model<T, {}> = schemes.get(collection);
  return await new Model(item).save();
};

// const add = async <T>(
//   collection: Collections,
//   item: OptionalId<T>
// ): Promise<WithId<T>> => {
//   try {
//     const newItem = await mongoClient
//       .db('makeupStoreDb')
//       .collection<T>(collection)
//       .insertOne(item);
//     if (newItem.ops.length) {
//       return newItem.ops[0];
//     } else {
//       throw new NotFoundError();
//     }
//   } catch {
//     throw new ServerError();
//   }
// };

// const getOne = async <T>(
//   collection: Collections,
//   query: FilterQuery<T>
// ): Promise<T> => {
//   try {
//     const items = await get(collection, query);
//     if (items.length) {
//       return items[0];
//     } else {
//       throw new NotFoundError();
//     }
//   } catch {
//     throw new ServerError();
//   }
// };

// const get = async <T>(
//   collection: Collections,
//   query: FilterQuery<T>
// ): Promise<T[]> => {
//   try {
//     return await mongoClient
//       .db('makeupStoreDb')
//       .collection<T>(collection)
//       .find(query)
//       .toArray();
//   } catch {
//     throw new ServerError();
//   }
// };

// const update = async <T>(
//   collection: Collections,
//   query: FilterQuery<T>,
//   updateQuery: MatchKeysAndValues<T>
// ): Promise<UpdateWriteOpResult> => {
//   try {
//     const updateResult = await mongoClient
//       .db('makeupStoreDb')
//       .collection<T>(collection)
//       .updateOne(query, {
//         $set: updateQuery,
//       });
//     return updateResult;
//   } catch {
//     throw new ServerError();
//   }
// };

// const remove = async <T>(
//   collection: Collections,
//   query: FilterQuery<T>,
//   updateQuery: MatchKeysAndValues<T>
// ): Promise<UpdateWriteOpResult> => {
//   try {
//     const updateResult = await mongoClient
//       .db('makeupStoreDb')
//       .collection<T>(collection)
//       .updateOne(query, {
//         $set: updateQuery,
//       });
//     return updateResult;
//   } catch {
//     throw new ServerError();
//   }
// };

export { initialize, close, add };
