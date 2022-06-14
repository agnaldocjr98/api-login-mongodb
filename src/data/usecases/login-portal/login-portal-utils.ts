import { FirebirdQueryDataParams } from '@/domain/usecases/firebird';

const ParamsVerificaEmail = (email: string): FirebirdQueryDataParams => {
   return {
      idsql: 1266,
      parametros: [
         {
            nome: 'EMAIL',
            valor: email,
            tipo: 'ftString',
         },
      ],
   };
};

const ParamsVerificaUserKey = (
   userkey: string,
   typeuserkey: string
): FirebirdQueryDataParams => {
   return {
      idsql: 1267,
      parametros: [
         {
            nome: 'TIPO',
            valor: typeuserkey,
            tipo: 'ftString',
         },
         {
            nome: 'CHAVEUSUARIO',
            valor: userkey,
            tipo: 'ftString',
         },
      ],
   };
};

const ParamsUpdateClient = (
   uidmongo: string,
   document: string
): FirebirdQueryDataParams => {
   return {
      idsql: 1268,
      parametros: [
         {
            nome: 'UIDMONGO',
            valor: uidmongo,
            tipo: 'ftString',
         },
         {
            nome: 'DOC',
            valor: document,
            tipo: 'ftString',
         },
      ],
   };
};

const ParamsGetDataClient = (uidmongo: string): FirebirdQueryDataParams => {
   return {
      idsql: 1269,
      parametros: [
         {
            nome: 'UIDMONGO',
            valor: uidmongo,
            tipo: 'ftString',
         },
      ],
   };
};

export {
   ParamsVerificaEmail,
   ParamsVerificaUserKey,
   ParamsUpdateClient,
   ParamsGetDataClient,
};
