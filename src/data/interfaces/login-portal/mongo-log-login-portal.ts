import { LogLoginPortalParams } from '@/domain/usecases/login-portal';

export interface MongoLogLoginPortalResult {
   created: boolean;
   content?: string;
}

export interface DataMongoLogLoginPortal {
   create(params: LogLoginPortalParams): Promise<MongoLogLoginPortalResult>;
}
