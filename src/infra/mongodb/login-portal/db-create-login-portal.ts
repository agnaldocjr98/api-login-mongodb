import {
   DataMongoCreateLoginPortal,
   MongoCreateLoginPortalResult,
} from '@/data/interfaces/login-portal';
import { CreateLoginPortalParams } from '@/domain/usecases/login-portal';
import { MongoClient } from 'mongodb';
import {
   mongoConnect,
   mongoDisconnect,
   mongoGetCollection,
} from '../mongo-helpers';

export class MongoCreateLoginPortal implements DataMongoCreateLoginPortal {
   async create(
      params: CreateLoginPortalParams
   ): Promise<MongoCreateLoginPortalResult> {
      try {
         const mongoclient = new MongoClient(
            process.env.MONGO_URL ? process.env.MONGO_URL : ''
         );
         mongoConnect(mongoclient);
         const collection = mongoGetCollection(mongoclient, 'client');
         const response = await collection.insertOne({
            userkey: params.userkey,
            password: params.password,
            typeconfirmation: params.typeconfirmation,
            suspense: false,
         });
         mongoDisconnect(mongoclient);
         if (response) {
            return { created: true, content: response.insertedId.toString() };
         } else {
            return {
               created: false,
               content: 'Falha ao criar o usuário no banco de dados',
            };
         }
      } catch (error: any) {
         return {
            created: false,
            content: error.message,
         };
      }
   }
}
