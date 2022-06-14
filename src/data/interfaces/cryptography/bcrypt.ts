export interface DataBCrypt {
   crypt(value: string): Promise<string>;
   compare(password: string, passwordMongo: string): Promise<boolean>;
}
