import { DataFirebirdQueryData } from '@/data/interfaces/firebird';
import { HttpClient } from '@/data/interfaces/http';
import { FirebirdQueryDataModel } from '@/domain/models/firebird';
import { FirebirdQueryDataParams } from '@/domain/usecases/firebird';

export class FirebirdQueryData implements DataFirebirdQueryData {
   constructor(private readonly httpClient: HttpClient) {}

   async query(
      params: FirebirdQueryDataParams
   ): Promise<FirebirdQueryDataModel> {
      const httpResponse = await this.httpClient.request({
         url: `${process.env.FIREBIRD_BASE_URL}${process.env.MODULE_FIREBIRD}/BuscaDados`,
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
