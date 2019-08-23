import { Injectable, Inject } from '@nestjs/common';
import { Users, UserModel } from '../models/';

import { USERS_REPOSITORY } from '../constants/constants';

import jwtDecode = require('jwt-decode');

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

    async getOneByVerifyCode(code: string): Promise<Users> {
        return await this.usersRepository.findOne({ where: { userVerify: code } });
    }
    async getOneByEmail(userEmail: string): Promise<Users> {
        return await this.usersRepository.findOne({ where: { email: userEmail } });
    }

    async addUser(user: UserModel): Promise<UserModel> {
        return await this.usersRepository.create(user);
    }

    async updateUser(userID: number, user): Promise<object> {
        try {
        const updatedUser = await this.usersRepository.update(
            {
                email: user.email,
                name: user.name,
                username: user.username,
                lastname: user.lastname,
                // password: user.password,
                telephone: user.telephone,
                age: user.age,
                country: user.country,
                gender: user.gender,
                img: user.img,
                isAdmin: user.isAdmin,
                isActive: user.isActive,
                userVerify: user.userVerify,
            },
            {
                where: {
                    id: userID,
                },
            });
        if (!updatedUser) {
            return {
                success: false,
                message: 'user not found',
                data: null,
            };
        }
        return {
            success: true,
            message: 'user updated',
            data: updatedUser,
        };
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
                data: null,
            };
        }
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

    async findOneByToken(userToken: string): Promise<Users> {
        const user = await jwtDecode(userToken);
        return await user;
    }
}
