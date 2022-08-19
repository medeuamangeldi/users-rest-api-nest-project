/* eslint-disable */
import { Controller, Delete, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('age') userAge: number,
  ) {
      const user = await this.usersService.createUser(
        userName,
        userEmail,
        userAge,
      );
      return { user };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;

  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Patch(':id')
    async updateUser(
    @Param('id') userId: string,
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('age') userAge: number,
    ) {
    const result = await this.usersService.updateUser(
        userId,
        userName,
        userEmail,
        userAge,
    );
    return result;
  }

  @Delete(':id')
    async removeUser(@Param('id') userId: string) {
    const res = await this.usersService.deleteUser(userId);
    return res;
  }

}