import { Collection, MongoClient } from 'mongodb';

export const mongoConnect = (client: MongoClient) => {
   client.connect();
};

export const mongoDisconnect = async (client: MongoClient): Promise<void> => {
   await client.close();
};

export const mongoGetCollection = (
   client: MongoClient,
   name: string
): Collection => {
   return client.db().collection(name);
};
