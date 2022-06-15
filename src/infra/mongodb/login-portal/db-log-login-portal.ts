import {
   DataMongoLogLoginPortal,
   MongoLogLoginPortalResult,
} from '@/data/interfaces/login-portal';
import { LogLoginPortalParams } from '@/domain/usecases/login-portal';
import { MongoClient } from 'mongodb';
import {
   mongoConnect,
   mongoDisconnect,
   mongoGetCollection,
} from '../mongo-helpers';

export class MongoLogLoginPortal implements DataMongoLogLoginPortal {
   async create(
      params: LogLoginPortalParams
   ): Promise<MongoLogLoginPortalResult> {
      try {
         const mongoclient = new MongoClient(
            process.env.MONGO_URL ? process.env.MONGO_URL : ''
         );
         mongoConnect(mongoclient);
         const collection = mongoGetCollection(mongoclient, 'log');
         const response = await collection.insertOne({
            ip: params.ip,
            latitude: params.latitude,
            longitude: params.longitude,
            device: params.device,
            datetime: params.datetime,
            success: params.success,
         });
         mongoDisconnect(mongoclient);
         if (response) {
            return { created: true };
         } else {
            return {
               created: false,
               content: 'Falha ao gravar log no banco de dados',
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
