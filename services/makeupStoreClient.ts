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

export { initialize, close };
