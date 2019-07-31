import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Users } from '../models/';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {

    constructor(private readonly authRepository: AuthRepository,
                private readonly jwtService: JwtService,
                private readonly userService: UserService,
    ) {}

    public async sign(thisUser: {email: string, password: string}): Promise<any> {
        return await this.authRepository.signUser(thisUser);
    }

    public async create(user: Users): Promise<any> {
        return await this.authRepository.createUser(user);
    }
}
