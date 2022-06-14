import { CreateLoginPortalParams } from '@/domain/usecases/login-portal';

export interface MongoCreateLoginPortalResult {
   created: boolean;
   content?: string;
}

export interface DataMongoCreateLoginPortal {
   create(
      params: CreateLoginPortalParams
   ): Promise<MongoCreateLoginPortalResult>;
}
