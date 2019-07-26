import { Controller, Get, Param, Body, Post, Put, Delete, UseGuards  } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../models/users/user.entity';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    // @UseGuards(AuthGuard('bearer'))
    findOne(@Param('id') id) {
        return this.userService.findOne(id);
    }

    @Post('')
    createUser(@Body() user) {
        return this.userService.addUser(user);
    }

    @Put(':id')
    // @UseGuards(AuthGuard('bearer'))
    changeUser(@Body() user, @Param('id') id) {
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    // @UseGuards(AuthGuard('bearer'))
    delUser(@Param('id') id) {
        return this.userService.deleteUser(id);
    }
}
