import { Injectable, Inject } from '@nestjs/common';
import { User } from '../models/users/user.model';
import { Users } from '../models/users/create-user.models';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
    constructor(@Inject(UserRepository)
    private readonly userRepository: UserRepository) {
    }
    async findAll(): Promise<User[]> {
        return await this.userRepository.getAll();
    }

    async findOne(id: number): Promise<Users> {
        return await this.userRepository.getOneById(id);
    }

    async addUser(user): Promise<Users> {
        return await this.userRepository.addUser(user);
    }
    async findOneByEmail(email: string): Promise<Users> {
        return await this.userRepository.getOneByEmail(email);
    }
    async updateUser(id: number, user: Users): Promise<Users> {
        return await this.userRepository.updateUser(id, user);
    }

    async deleteUser(id: number): Promise<Users> {
        return await this.userRepository.deleteUser(id);
    }

    async findOneByToken(userToken: string): Promise<any> {
        return await this.userRepository.findOneByToken(userToken);
    }
}
