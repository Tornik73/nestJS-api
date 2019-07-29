import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/users/user.model';
import { Users } from '../models/users/create-user.models';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';

import bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private readonly authRepository: AuthRepository,
                private readonly jwtService: JwtService,
                private readonly userService: UsersService,
    ) {}

    async sign(thisUser: {email: string, password: string}): Promise<any> {
        return this.authRepository.signUser(thisUser);
    }

    async create(user: Users): Promise<any> {
        return this.authRepository.createUser(user);
    }
}
