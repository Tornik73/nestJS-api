import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Users, UserModel } from '../models/';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
    constructor(
                private readonly userService: UserService) {
        super();
    }

    public async validate(token: string): Promise<Users> {
        const user: Users = await this.userService.findOneByToken(token);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
