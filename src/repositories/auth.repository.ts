import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserModel } from '../models/index';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/user.service';

import bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

@Injectable()
export class AuthRepository {
    constructor(private readonly jwtService: JwtService,
                private usersService: UserService) { }

    async signUser(thisUser: { email: string, password: string }): Promise<any> {
        const responseUser = await this.usersService.findOneByEmail(thisUser.email);

        if (!responseUser) {
            throw new HttpException({ message: 'User with such email does not exist' }, HttpStatus.BAD_REQUEST);
        }
        const matchPasswords = await bcrypt.compare(thisUser.password, responseUser.password);
        if (!matchPasswords) {
            throw new HttpException({ message: 'No such user exists' }, HttpStatus.BAD_REQUEST);
        }

        const payloadUser: UserModel = {
            id: responseUser.id,
            email: responseUser.email,
            // password: responseUser.password,
            telephone: responseUser.telephone,
            age: responseUser.age,
            isAdmin: responseUser.isAdmin,
            username: responseUser.username,
            isActive: responseUser.isActive,
        };
        const payload = JSON.stringify(payloadUser);
        const accessToken = await this.jwtService.sign(payload);
        return await Object.assign(responseUser, { data: accessToken });
    }

    public async createUser(user: UserModel): Promise<UserModel> {
        const thisUser: UserModel = {
            id: null,
            email: user.email,
            name: user.name,
            username: user.username,
            lastname: user.lastname,
            password: await bcrypt.hash(user.password, salt),
            telephone: user.telephone,
            age: user.age,
            country: user.country,
            gender: user.gender,
            img: user.img,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            userVerify: user.userVerify,
        };

        const { email } = thisUser;
        const userEmail = email;

        const responseUser = await this.usersService.findOneByEmail(userEmail);

        if (responseUser) {
            const errors = { username: 'Username and email must be unique.' };
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
        } else {
            this.usersService.addUser(thisUser);
            return thisUser;
        }
    }
}
