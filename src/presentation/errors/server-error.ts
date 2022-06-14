export class ServerError extends Error {
   constructor(stack: string) {
      super(stack);
      this.name = 'ServerError';
      this.stack = stack;
   }
}
