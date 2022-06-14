import { FirebirdQueryDataModel } from '@/domain/models/firebird';

interface Param {
   nome: string;
   valor: string;
   tipo: string;
}

export interface FirebirdQueryDataParams {
   idsql: number;
   parametros: Param[];
}

export interface UCFirebirdQueryData {
   query(params: FirebirdQueryDataParams): Promise<FirebirdQueryDataModel>;
}
