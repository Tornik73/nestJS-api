import { environmentDevelopment, environmentProduction } from '../environment';

export interface Environment {
    provide?: string;
    operatorsAliases?: boolean;
    dialect?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    jwtSecretKey?: string;
    tokenExpireTime?: number;
    apiKey?: string;
}

export const environment = () => {
    const configuration = process.env.NODE_ENV;
    switch (configuration) {
        case 'DEVELOPMENT':
            return environmentDevelopment;
        case 'PRODUCTION':
            return environmentProduction;
        default:
            return environmentDevelopment;
    }
};
