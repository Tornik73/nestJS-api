// import { Controller, Post, Request, Response, HttpStatus, ValidationPipe, UsePipes } from '@nestjs/common';
// import { AuthService } from '../services/auth.service';
// import { User } from '../models/users/user.entity';
// @Controller()
// export class AuthController {

//     constructor(private readonly authService: AuthService) {}

//     @Post('authenticate')
//     async login(@Request() req, @Response() res) {
//         const body = req.body;
//         const user = await this.authService.sign(body);
//         res.status(HttpStatus.ACCEPTED).json({
//             token: user.data,
//             img: user.img,
//         });
//     }

//     // @UsePipes(new ValidationPipe())
//     @Post('register')
//     async create(@Request() req) {
//         return this.authService.create(Object.assign( req.body, {isAdmin : req.body.isAdmin || 0}));
//     }
// }
