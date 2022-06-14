import { FirebirdQueryDataModel } from '@/domain/models/firebird';
import { FirebirdQueryDataParams } from '@/domain/usecases/firebird';

export interface DataFirebirdQueryData {
   query(params: FirebirdQueryDataParams): Promise<FirebirdQueryDataModel>;
}
