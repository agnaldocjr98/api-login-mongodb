import { DataFirebirdExecData } from '@/data/interfaces/firebird';
import { HttpClient } from '@/data/interfaces/http';
import { FirebirdExecDataModel } from '@/domain/models/firebird';
import { FirebirdExecDataParams } from '@/domain/usecases/firebird';

export class FirebirdExecData implements DataFirebirdExecData {
   constructor(private readonly httpClient: HttpClient) {}

   async execute(
      params: FirebirdExecDataParams
   ): Promise<FirebirdExecDataModel> {
      const httpResponse = await this.httpClient.request({
         url: `${process.env.FIREBIRD_BASE_URL}${process.env.MODULE_FIREBIRD}/ExecutaQuery`,
         method: 'post',
         body: params,
         headers: {
            'Content-type': 'application/json',
            Authorization: process.env.DELPHI_API_AUTHORIZATION,
         },
      });
      return httpResponse.body;
   }
}
