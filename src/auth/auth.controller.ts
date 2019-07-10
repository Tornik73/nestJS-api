import { Controller, Post, Request, Response, HttpStatus, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/interface/user.interface';
@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('authenticate')
    async login(@Request() req, @Response() res) {
        const body = req.body;
        const user: User = await this.authService.sign(body);
        res.status(HttpStatus.ACCEPTED).json({
            // data: user.data,
            email: user.email,
            id: user.id,
            password: user.password,
            age: user.age,
            telephone: user.telephone,
            img: user.img,
        });
    }

    @UsePipes(new ValidationPipe())
    @Post('register')
    async create(@Request() req) {
        return this.authService.create(Object.assign( req.body, {isAdmin : req.body.isAdmin || 0}));
    }
}
