export class MissingParamError extends Error {
   constructor(paramName: string) {
      super(`Está faltando o parâmetro ${paramName}`);
      this.name = 'MissingParamError';
   }
}
