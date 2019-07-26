import { Authors } from '../authors/create-author.models';
import { AUTHORS_REPOSITORY } from '../../constants/constants';

export const authorsProviders = [
    {
        provide: AUTHORS_REPOSITORY,
        useValue: Authors,
    },
];
