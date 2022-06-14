import { CreateLoginPortalModel } from '@/domain/models/login-portal';
import {
   CreateLoginPortalParams,
   UCCreateLoginPortal,
} from '@/domain/usecases/login-portal';
import { DataMongoCreateLoginPortal } from '@/data/interfaces/login-portal';
import { DataFirebirdQueryData } from '@/data/interfaces/firebird/query-data';
import { FirebirdQueryDataModel } from '@/domain/models/firebird';
import {
   ParamsUpdateClient,
   ParamsVerificaEmail,
   ParamsVerificaUserKey,
} from './login-portal-utils';
import { DataFirebirdExecData } from '@/data/interfaces/firebird';
import { DataBCrypt } from '@/data/interfaces/cryptography/bcrypt';

interface EmailIsValid {
   RESULT: string;
}

interface UserKeyIsValid {
   SUCESSO: 'S' | 'N';
   MENSAGEM: string;
}

export class CreateLoginPortal implements UCCreateLoginPortal {
   constructor(
      private readonly mongocreateloginportal: DataMongoCreateLoginPortal,
      private readonly firebirquerydata: DataFirebirdQueryData,
      private readonly firebirdexecdata: DataFirebirdExecData,
      private readonly bcrypt: DataBCrypt
   ) {}

   async create(
      params: CreateLoginPortalParams
   ): Promise<CreateLoginPortalModel> {
      try {
         if (params.typeuserkey === 'E') {
            const paramSQL = ParamsVerificaEmail(params.userkey);

            // verifica se tem o email cadastrado em nossa base de dados!!!
            const firebird: FirebirdQueryDataModel<EmailIsValid> =
               await this.firebirquerydata.query(paramSQL);

            if (!firebird.sucesso)
               return { created: false, errorMessage: firebird.mensagem };
            if (!!firebird.dados[0].RESULT)
               return {
                  created: false,
                  errorMessage: firebird.dados[0].RESULT,
               };
         }

         const paramSQL = ParamsVerificaUserKey(
            params.userkey,
            params.typeuserkey
         );

         // validação se há um CPF em nossa base de dados com base no userkey
         // e se o usuário já está cadastrado no mongo
         const firebird: FirebirdQueryDataModel<UserKeyIsValid> =
            await this.firebirquerydata.query(paramSQL);

         if (!firebird.sucesso)
            return { created: false, errorMessage: firebird.mensagem };
         if (firebird.dados[0].SUCESSO === 'N')
            return {
               created: false,
               errorMessage: firebird.dados[0].MENSAGEM,
            };

         const document = firebird.dados[0].MENSAGEM; //CPF/CNPJ do cliente
         const hashPassword = await this.bcrypt.crypt(params.password);

         const mongo = await this.mongocreateloginportal.create({
            ...params,
            suspense: false,
            password: hashPassword,
         });

         if (mongo.created) {
            const params = ParamsUpdateClient(
               mongo.content as string,
               document
            );
            const response = await this.firebirdexecdata.execute(params);
            if (!response.sucesso) {
               return { created: false, errorMessage: response.mensagem };
            }
            return { created: true };
         }
         return { created: false, errorMessage: mongo.content };
      } catch (error: any) {
         return {
            created: false,
            errorMessage: error.message,
         };
      }
   }
}
