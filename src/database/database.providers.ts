import { Sequelize } from 'sequelize-typescript';
import { Authors } from '../models/authors/create-author.entity';
import { Books } from '../models/books/create-book.models';
import { AuthorsBooks } from '../models/authorsBooks/create-authorsBooks';
import { Users } from '../models/users/create-user.models';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                operatorsAliases: false,
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'bookstore',
            });
            sequelize.addModels([Books, Authors, AuthorsBooks, Users]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
