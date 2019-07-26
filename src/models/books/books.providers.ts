import { Books } from '../index';
import { BOOKS_REPOSITORY } from '../../constants/constants';

export const booksProviders = [
    {
        provide: BOOKS_REPOSITORY,
        useValue: Books,
    },
];
