import { AccomplishLoginPortalModel } from '@/domain/models/login-portal';
import {
   AccomplishLoginPortalParams,
   UCAccomplishLoginPortal,
} from '@/domain/usecases/login-portal';
import { DataMongoAccomplishLoginPortal } from '@/data/interfaces/login-portal';

export class AcomplishLoginPortal implements UCAccomplishLoginPortal {
   constructor(
      private readonly MongoAccomplish: DataMongoAccomplishLoginPortal
   ) {}

   async accomplish(
      params: AccomplishLoginPortalParams
   ): Promise<AccomplishLoginPortalModel> {
      return await this.MongoAccomplish.accomplish(params);
   }
}
