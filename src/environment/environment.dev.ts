import fs = require('fs');
import { Environment } from './environment';

export const environmentDevelopment: Environment = {
    provide: 'SEQUELIZE',
    operatorsAliases: false,
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'bookstore',
    jwtSecretKey: fs.readFileSync('src/secrets/jwtSecretKey.key').toString(),
    tokenExpireTime: 60 * 60 * 24,
};
