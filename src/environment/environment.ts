import { Injectable } from '@nestjs/common';

import fs = require('fs');

@Injectable()
export class Environment {
    public httpPort: string = '3306';
    public httpsPort: string = '443';
    public databaseProviderName: string = 'bookstore';
    public databaseMongoConnectionUrl: string;
    public buildMode: string;
    public static jwtSecretKey: string = fs.readFileSync('src/secrets/jwtSecretKey.key').toString();
    public static tokenExpireTime = 60 * 60 * 24;

    constructor() {
        const environment = process.env.NODE_ENV || 'development';

        switch (environment) {
            case 'DEVELOPMENT':
                this.development();
                break;
            case 'PRODUCTION':
                this.production();
                break;
            default:
                this.development();
                break;
        }
    }

    development() {
        this.databaseMongoConnectionUrl = 'http://localhost:3001/';
        this.buildMode = 'Development';
    }

    production() {
        this.databaseMongoConnectionUrl = 'http://localhost:3001/';
        this.buildMode = 'Production';
    }
}
