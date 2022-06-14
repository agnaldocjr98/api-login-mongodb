import { FirebirdExecDataModel } from '@/domain/models/firebird';

interface Param {
   nome: string;
   valor: string;
   tipo: string;
}

export interface FirebirdExecDataParams {
   idsql: number;
   parametros: Param[];
}

export interface UCFirebirdExecData {
   execute(params: FirebirdExecDataParams): Promise<FirebirdExecDataModel>;
}
