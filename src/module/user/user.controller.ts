import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.interfaces';
import { InternalSeverException } from 'src/common/helpers/http-exception.filter';
import { SucessResponse } from 'src/common/helpers/constants';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            const user = await this.userService.create(createUserDto);
            return new SucessResponse('Create success', user);
        } catch (error) {
            throw new InternalSeverException(error);
        }
    }

    @Get()
    async findAll() {
        try {
            const users = await this.userService.findAll();
            return new SucessResponse('Found', users);
        } catch (error) {
            throw new InternalSeverException(error);
        }
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        try {
            const user = await this.userService.findOne(+id);
            return new SucessResponse('Found', user);
        } catch (error) {
            throw new InternalSeverException(error);
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            const user = await this.userService.update(+id, updateUserDto);
            return new SucessResponse('Found', user);
        } catch (error) {
            throw new InternalSeverException(error);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            const user = await this.userService.removeById(+id);
            return new SucessResponse('Found', user);
        } catch (error) {
            throw new InternalSeverException(error);
        }
    }
}
