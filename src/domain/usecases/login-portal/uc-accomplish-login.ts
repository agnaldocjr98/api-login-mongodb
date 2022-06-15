import { AccomplishLoginPortalModel } from '@/domain/models/login-portal';

export interface AccomplishLoginPortalParams {
   userkey: string;
   password: string;
   logdata: {
      ip: string;
      latitude: number;
      longitude: number;
      device: string;
   };
}

export interface UCAccomplishLoginPortal {
   accomplish(
      params: AccomplishLoginPortalParams
   ): Promise<AccomplishLoginPortalModel>;
}
