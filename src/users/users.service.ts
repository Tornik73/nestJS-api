import { Injectable } from '@nestjs/common';
import { User } from '../interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './create-user.models';
import { Repository } from 'typeorm';

import jwtDecode = require('jwt-decode');

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users)
    private readonly userRepository: Repository<Users>) {
    }
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async addUser(user: User): Promise<any> {
        return await this.userRepository.insert(user);
    }

    async updateUser(id, user: User): Promise<any> {
        return await this.userRepository.update(id, user);
    }

    async deleteUser(id): Promise<any> {
        return await this.userRepository.delete(id);
    }

    async findOneByToken(userToken: string): Promise<any> {
        const user = await jwtDecode(userToken);
        return await user;
    }
}
