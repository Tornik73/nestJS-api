// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../models/users/user.entity';
// import { Users } from '../models/users/create-user.models';
// import { Repository, getRepository } from 'typeorm';
// import { UsersService } from './users.service';
// import { JwtService } from '@nestjs/jwt';

// import bcrypt = require('bcrypt');
// const salt = bcrypt.genSaltSync(10);

// @Injectable()
// export class AuthService {

//     constructor(@InjectRepository(Users)
//                 private readonly authRepository: Repository<Users>,
//                 private readonly jwtService: JwtService,
//                 private readonly userService: UsersService,
//     ) {}

//     async sign(thisUser: {email: string, password: string}): Promise<any> {
//         const {email, password} = thisUser;
//         const userDb = await getRepository(Users)
//             .createQueryBuilder('user')
//             .where('user.email = :email', { email });
//         const responseUser = await userDb.getOne();
//         if (!responseUser) {
//             throw new HttpException({ message: 'User with such email does not exist'}, HttpStatus.BAD_REQUEST);
//         }
//         const matchPasswords = await bcrypt.compare(password, responseUser.password);
//         if (!matchPasswords) {
//             throw new HttpException({ message: 'No such user exists' }, HttpStatus.BAD_REQUEST);
//         }

//         const payloadUser = {id: responseUser.id, email: responseUser.email, password: responseUser.password,
//                 telephone: responseUser.telephone, age: responseUser.age, isAdmin: responseUser.isAdmin};
//         const payload = JSON.stringify(payloadUser);
//         const accessToken = await this.jwtService.sign(payload);
//         return await Object.assign(responseUser, {data: accessToken});
//     }

//     async create(user: Users): Promise<any> {
//         const thisUser: User = {
//             id: null,
//             email: user.email,
//             password: await bcrypt.hash(user.password, salt),
//             telephone: user.telephone,
//             age: user.age,
//             img: user.img,
//             isAdmin: user.isAdmin,
//         };

//         const { email } = thisUser;
//         const userDb = await getRepository(Users)
//             .createQueryBuilder('user')
//             .where('user.email = :email', { email });

//         const responseUser = await userDb.getOne();

//         if (responseUser) {
//             const errors = { username: 'Username and email must be unique.' };
//             throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
//         } else {
//             this.authRepository.insert(thisUser);
//             return thisUser;
//         }
//     }
// }
