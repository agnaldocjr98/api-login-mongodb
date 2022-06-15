import { AcomplishLoginPortal } from '@/data/usecases/login-portal';
import { Cryptography } from '@/infra/cryptography/cryptojs';
import { FirebirdQueryData } from '@/infra/firebird/query-data';
import { AxiosHttpAdapter } from '@/infra/http';
import { MongoAccomplishLoginPortal } from '@/infra/mongodb/login-portal';
import { MongoLogLoginPortal } from '@/infra/mongodb/login-portal/db-log-login-portal';
import { AccomplishLoginPortalController } from '@/presentation/controllers/login-portal';

export const makeAccomplishLoginPortal =
   (): AccomplishLoginPortalController => {
      const bcrypt = new Cryptography();
      const httpClient = new AxiosHttpAdapter();
      const firebirdQueryData = new FirebirdQueryData(httpClient);
      const log = new MongoLogLoginPortal();
      const mongoAccomplishLogin = new MongoAccomplishLoginPortal(
         bcrypt,
         firebirdQueryData,
         log
      );
      const accomplishLogin = new AcomplishLoginPortal(mongoAccomplishLogin);
      return new AccomplishLoginPortalController(accomplishLogin);
   };
