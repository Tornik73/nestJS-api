import { Books } from '../index';
import {CHAT_REPOSITORY } from '../../constants/constants';
import { Chat } from '../index';

export const chatProviders = [
    {
        provide: CHAT_REPOSITORY,
        useValue: Chat,
    },
];
