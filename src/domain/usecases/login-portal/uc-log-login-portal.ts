import { LogLoginPortalModel } from '@/domain/models/login-portal';

export interface LogLoginPortalParams {
   ip: string;
   latitude: number;
   longitude: number;
   device: string;
   datetime: string;
   success: boolean;
}

export interface UCLogLoginPortal {
   create(params: LogLoginPortalParams): Promise<LogLoginPortalModel>;
}
