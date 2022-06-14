import { CreateLoginPortalModel } from '@/domain/models/login-portal';

export interface CreateLoginPortalParams {
   userkey: string;
   password: string;
   typeconfirmation: 'E' | 'S' | 'L';
   typeuserkey: 'E' | 'T' | 'D';
   suspense: boolean;
}

export interface UCCreateLoginPortal {
   create(params: CreateLoginPortalParams): Promise<CreateLoginPortalModel>;
}
