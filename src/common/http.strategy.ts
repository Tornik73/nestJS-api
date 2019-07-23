import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService,
                private readonly userService: UsersService) {
        super();
    }

    async validate(token: any) {
        const user = await this.userService.findOneByToken(token);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
