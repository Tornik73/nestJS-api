import fs = require('fs');
import { Environment } from './environment';

// tslint:disable-next-line:one-variable-per-declaration
export const environmentProduction: Environment = {
    provide: 'SEQUELIZE',
    operatorsAliases: false,
    dialect: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'bookstore',
    jwtSecretKey: fs.readFileSync('src/secrets/jwtSecretKey.key').toString(),
    tokenExpireTime: 60 * 60 * 24,
};
