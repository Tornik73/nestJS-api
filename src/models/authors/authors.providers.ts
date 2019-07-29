import { Authors } from './create-author.model';
import { AUTHORS_REPOSITORY } from '../../constants/constants';

export const authorsProviders = [
    {
        provide: AUTHORS_REPOSITORY,
        useValue: Authors,
    },
];
