import 'module-alias/register';
import app from './config/app';
import dotenv from 'dotenv';

import path from 'path';
import moduleAlias from 'module-alias';

moduleAlias.addAlias('@', path.join(__dirname, '../'));

dotenv.config();

app.listen(process.env.PORT, async () => {
   console.log(`EdCredit API Online - Porta: ${process.env.PORT}`);
   if (process.env.NODE_ENV?.includes('GITCOMMIT')) process.exit();
});
