import { CreateLoginPortal } from '@/data/usecases/login-portal';
import { Cryptography } from '@/infra/cryptography/cryptojs';
import { FirebirdExecData } from '@/infra/firebird/exec-data';
import { FirebirdQueryData } from '@/infra/firebird/query-data';
import { AxiosHttpAdapter } from '@/infra/http';
import { MongoCreateLoginPortal } from '@/infra/mongodb/login-portal';
import { CreateLoginPortalController } from '@/presentation/controllers/login-portal';

export const makeCreateLoginPortal = (): CreateLoginPortalController => {
   const mongoCreateLogin = new MongoCreateLoginPortal();
   const httpClient = new AxiosHttpAdapter();
   const firebirdQueryData = new FirebirdQueryData(httpClient);
   const firebirdExecData = new FirebirdExecData(httpClient);
   const cryptography = new Cryptography();

   const createlogin = new CreateLoginPortal(
      mongoCreateLogin,
      firebirdQueryData,
      firebirdExecData,
      cryptography
   );
   return new CreateLoginPortalController(createlogin);
};
