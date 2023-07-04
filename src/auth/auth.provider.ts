import { Connection } from 'mongoose';
import { DB_PROVIDER, USER_PROVIDER } from 'src/config';

import { UserSchema } from 'src/models/user.model';



export const AuthProvider = [
  {
    provide: USER_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject:   [DB_PROVIDER],
  },

];