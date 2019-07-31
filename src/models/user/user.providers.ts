import { Users } from './create-user.models';
import { USERS_REPOSITORY } from '../../constants/constants';

export const userProviders = [
    {
        provide: USERS_REPOSITORY,
        useValue: Users,
    },
];
