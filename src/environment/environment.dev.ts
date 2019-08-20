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
    database: 'bookStoreDB',
    jwtSecretKey: fs.readFileSync('src/secrets/jwtSecretKey.key').toString(),
    tokenExpireTime: 60 * 60 * 24,
    apiKey: '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',
};
