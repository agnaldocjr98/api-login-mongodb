import { DataBCrypt } from '@/data/interfaces/cryptography/bcrypt';
import bcrypt from 'bcrypt';

export class Cryptography implements DataBCrypt {
   async crypt(value: string): Promise<string> {
      //@ts-ignore
      return bcrypt.hash(value, 10);
   }

   async compare(password: string, passwordMongo: string): Promise<boolean> {
      return await bcrypt.compareSync(password, passwordMongo);
   }
}
