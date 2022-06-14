import { FirebirdExecDataModel } from '@/domain/models/firebird';
import { FirebirdExecDataParams } from '@/domain/usecases/firebird';

export interface DataFirebirdExecData {
   execute(params: FirebirdExecDataParams): Promise<FirebirdExecDataModel>;
}
