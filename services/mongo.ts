import mongoose from 'mongoose';

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
