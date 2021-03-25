import { MongoClient } from 'mongodb';
import { Item } from './models/item';

const mongoClient = new MongoClient('mongodb://localhost:27017/', {
  useUnifiedTopology: true,
});

const itemsCollection = () =>
  mongoClient.db('makeupStoreDb').collection<Item>('items');
const categoryCollection = () =>
  mongoClient.db('makeupStoreDb').collection('categories');

const connect = () => mongoClient.connect();

const closeConnection = () => mongoClient.close();

export { connect, closeConnection, itemsCollection, categoryCollection };
