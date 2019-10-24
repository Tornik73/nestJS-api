import { Sequelize } from 'sequelize-typescript';
import { Authors } from '../models/author/create-author.model';
import { Books } from '../models/book/create-book.models';
import { AuthorsBooks } from '../models/authorBook/create-authorsBooks';
import { Users } from '../models/user/create-user.models';
import { environment, Environment } from '../environment/index';
import { Chat } from '../models/chat/create-chat.model';

const env: Environment = environment();

export const databaseProviders = [
    {
        provide: env.provide,
        useFactory: async () => {
            const sequelize = new Sequelize({
                operatorsAliases: env.operatorsAliases,
                dialect: env.dialect,
                host: env.host,
                port: env.port,
                username: env.username,
                password: env.password,
                database: env.database,
            });
            sequelize.addModels([Books, Authors, AuthorsBooks, Users, Chat]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
