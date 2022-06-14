export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`O parâmetro ${paramName} é inválido!`);
    this.name = "InvalidParamError";
  }
}
