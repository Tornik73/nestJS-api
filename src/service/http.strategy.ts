import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

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
