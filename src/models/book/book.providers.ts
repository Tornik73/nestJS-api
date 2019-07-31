import { Books } from '../index';
import { BOOKS_REPOSITORY } from '../../constants/constants';

export const bookProviders = [
    {
        provide: BOOKS_REPOSITORY,
        useValue: Books,
    },
];
