import { AuthorsBooks } from '../authorsBooks/create-authorsBooks';
import { AUTHORS_BOOKS_REPOSITORY } from '../../constants/constants';

export const authorBookProviders = [
    {
        provide: AUTHORS_BOOKS_REPOSITORY,
        useValue: AuthorsBooks,
    },
];
