import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/users/user.model';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
    constructor(
                private readonly userService: UsersService) {
        super();
    }

    public async validate(token: string): Promise<User> {
        const user = await this.userService.findOneByToken(token);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
