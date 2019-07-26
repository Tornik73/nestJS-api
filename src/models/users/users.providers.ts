import { Users } from '../users/create-user.models';
import { USERS_REPOSITORY } from '../../constants/constants';

export const usersProviders = [
    {
        provide: USERS_REPOSITORY,
        useValue: Users,
    },
];
