import { AccomplishLoginPortalModel } from '@/domain/models/login-portal';

export interface AccomplishLoginPortalParams {
   userkey: string;
   password: string;
}

export interface UCAccomplishLoginPortal {
   accomplish(
      params: AccomplishLoginPortalParams
   ): Promise<AccomplishLoginPortalModel>;
}
