import { AccomplishLoginPortalParams } from '@/domain/usecases/login-portal';

export interface MongoAccomplishLoginPortalResult {
   isAuthenticated: boolean;
   errorMessage?: string;
   clientData?: {
      document: string;
      name: string;
   };
}

export interface DataMongoAccomplishLoginPortal {
   accomplish(
      params: AccomplishLoginPortalParams
   ): Promise<MongoAccomplishLoginPortalResult>;
}
