import { Controller, Get, Param, Body, Post, Put, Delete, Request, UseGuards  } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Users, UserModel } from '../models';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard('bearer'))
    public async findAllUsers(): Promise<UserModel[]> {
        const users: UserModel[] = await this.userService.findAll();
        return users;
    }

    @Get(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async findOneUser(@Param('id') id: number): Promise<UserModel> {
        const user: UserModel = await this.userService.findOne(id);
        return user;
    }

    @Post('')
    public async createUser(@Body() user: UserModel): Promise<any> {
        const createdUser = await this.userService.addUser(user);
        return createdUser;
    }

    @Put(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async changeUser(@Body() user: Users, @Param('id') id: number): Promise<UserModel> {
        const changedUser: UserModel = await this.userService.updateUser(id, user);
        return changedUser;
    }

    @Delete(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async deleteUser(@Param('id') id: number): Promise<UserModel> {
        const deletedUser: Users = await this.userService.deleteUser(id);
        return deletedUser;
    }

}
