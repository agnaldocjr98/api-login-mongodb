export interface FirebirdQueryDataModel<T = any> {
   sucesso: boolean;
   recuperado: number;
   dados: [T];
   mensagem: string;
}
