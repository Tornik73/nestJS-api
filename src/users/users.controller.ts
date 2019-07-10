import { Controller, Get, Param, Body, Post, Put, Delete, UseGuards  } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/interface/user.interface';
// import { AuthGuard } from '@nestjs/passport';
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
    createUser(@Body() user: User) {
        return this.userService.addUser(user);
    }

    @Put(':id')
    // @UseGuards(AuthGuard('bearer'))
    changeUser(@Body() user: User, @Param('id') id) {
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    // @UseGuards(AuthGuard('bearer'))
    delUser(@Param('id') id) {
        return this.userService.deleteUser(id);
    }
}
