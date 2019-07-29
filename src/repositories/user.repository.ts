import { Injectable, Inject } from '@nestjs/common';
import { Users } from '../models/users/create-user.models';
import jwtDecode = require('jwt-decode');
import { USERS_REPOSITORY } from '../constants/constants';

@Injectable()
export class UserRepository {
    constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: typeof Users) {}

    public async getAll(): Promise<Users[]> {
        const users = await this.usersRepository.findAll<Users>();
        return users;
    }

    async getOneById(userID: number): Promise<Users> {
        return await this.usersRepository.findOne({ where: { id: userID } });
    }

    async addUser(user: Users): Promise<Users> {
        return await this.usersRepository.create(user);
    }

    async updateUser(userID: number, user: Users): Promise<any> {
        return await this.usersRepository.update(
            {
                email: user.email,
                password: user.password,
                isAdmin: user.isAdmin,
                telephone: user.telephone,
                age: user.age,
                img: user.img,
            },
            {
                where: {
                    id: userID,
                },
            });
    }

    async deleteUser(userID: number): Promise<any> {
        try {
            const user = await this.usersRepository.destroy({
                where: {
                    id: userID,
                },
            });

            if (!user) {
                return {
                    success: false,
                    message: 'user not found',
                    data: null,
                };
            }
            return {
                success: true,
                message: 'user deleted',
                data: null,
            };
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
                data: null,
            };
        }
    }

    // async findOneByToken(userToken: string): Promise<any> {
    //     const user = await jwtDecode(userToken);
    //     return await user;
    // }
}