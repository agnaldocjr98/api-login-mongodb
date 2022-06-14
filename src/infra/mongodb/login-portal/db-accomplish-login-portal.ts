import { DataBCrypt } from '@/data/interfaces/cryptography/bcrypt';
import { DataFirebirdQueryData } from '@/data/interfaces/firebird';
import {
   DataMongoAccomplishLoginPortal,
   MongoAccomplishLoginPortalResult,
} from '@/data/interfaces/login-portal';
import { ParamsGetDataClient } from '@/data/usecases/login-portal/login-portal-utils';
import { FirebirdQueryDataModel } from '@/domain/models/firebird';
import { AccomplishLoginPortalParams } from '@/domain/usecases/login-portal';
import { MongoClient } from 'mongodb';
import {
   mongoConnect,
   mongoDisconnect,
   mongoGetCollection,
} from '../mongo-helpers';

interface GetDataClient {
   DOC: string;
   NAME: string;
}

export class MongoAccomplishLoginPortal
   implements DataMongoAccomplishLoginPortal
{
   constructor(
      private readonly bcrypt: DataBCrypt,
      private readonly firebirdgetdata: DataFirebirdQueryData
   ) {}

   async accomplish(
      params: AccomplishLoginPortalParams
   ): Promise<MongoAccomplishLoginPortalResult> {
      try {
         const client = new MongoClient(
            process.env.MONGO_URL ? process.env.MONGO_URL : ''
         );
         mongoConnect(client);

         const collection = mongoGetCollection(client, 'client');
         const response = await collection.findOne({
            userkey: params.userkey,
         });

         mongoDisconnect(client);
         if (response) {
            const isMatch = await this.bcrypt.compare(
               params.password,
               response.password
            );

            if (isMatch) {
               const uidmongo = response._id.toString();
               const params = ParamsGetDataClient(uidmongo);

               const firebird: FirebirdQueryDataModel<GetDataClient> =
                  await this.firebirdgetdata.query(params);
               if (!firebird.sucesso || firebird.recuperado === 0)
                  return {
                     isAuthenticated: false,
                     errorMessage:
                        'As credenciais foram validadas porém houve um problema ao buscar os dados do cliente!',
                  };

               return {
                  isAuthenticated: true,
                  clientData: {
                     document: firebird.dados[0].DOC,
                     name: firebird.dados[0].NAME,
                  },
               };
            }
            return {
               isAuthenticated: false,
               errorMessage: 'Credenciais inválidas!',
            };
         }
         return {
            isAuthenticated: false,
            errorMessage: 'Credenciais inválidas!',
         };
      } catch (error: any) {
         return {
            isAuthenticated: false,
            errorMessage: `Mongo failed to connect: ${error.message}`,
         };
      }
   }
}
