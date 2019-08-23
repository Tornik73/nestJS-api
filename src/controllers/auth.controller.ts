import { Controller, Post, Request, Response, HttpStatus, ValidationPipe, UsePipes, Get, Param } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Users, UserModel } from '../models';
import { UserService } from '../services/user.service';

import { environment, Environment } from '../environment/index';
import { JwtService } from '@nestjs/jwt';

const env: Environment = environment();

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService,
                private userService: UserService,
                private jwtService: JwtService) {}

    @Post('authenticate')
    public async login(@Request() req, @Response() res) {
        const body = req.body;
        const user = await this.authService.sign(body);
        res.status(HttpStatus.ACCEPTED).json({
            token: user.data,
            img: user.img,
        });
    }

    // @UsePipes(new ValidationPipe())
    @Post('register')
    public async create(@Request() req) {
        const userVerifyCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const user = await this.authService.create(Object.assign( req.body, {isAdmin : req.body.isAdmin || 0, userVerify: userVerifyCode}));
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(env.apiKey);
        const link = 'http://' + env.host + ':8100/confirm/' + userVerifyCode;
        const msg = {
            to: 'wipix@alltopmail.com',
            from: 'bookstore@bookstore.com',
            subject: 'Welcome to BookStore! Confirm Your Email!',
            text: 'and easy to do anywhere, even with Node.js',
            html: `<strong>Confirm your email by clicking on this link1:</strong><a href="` + link + `"> Confirm email</a>`,
        };
        sgMail.send(msg);
        return user;
    }

    @Get('confirm/:token')
    public async verifyUser(@Param('token') token: string): Promise<any> {
        const response = await this.userService.findOneByVerifyCode(token);
        response.isActive = true;
        const changedUser = await this.userService.updateUser(response.id, response);
        return changedUser;
    }
}
