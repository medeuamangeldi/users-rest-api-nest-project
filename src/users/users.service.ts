/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
   @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createUser(name: string, email: string, age: number) {
    const newUser = new this.userModel({
      name,
      email: email,
      age,
    });
    const result = await newUser.save();
    return result;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUserById(userId: string) {
    const user = await this.findUser(userId);
    return user;
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`user with ID: ${id} does not exist.`);
    }
    if (!user) {
      throw new NotFoundException(`user with ID: ${id} does not exist.`);
  }
    return user;
  }

  async updateUser(
    userId: string,
    name: string,
    email: string,
    age: number,
  ) {
    const updatedUser = await this.findUser(userId);
    const result = await updatedUser.updateOne({
      $set: {
        name: name ? name : updatedUser.name,
        email: email ? email : updatedUser.email,
        age: age ? age : updatedUser.age,
      },
    });
    if (result.matchedCount === 0) {
      throw new NotFoundException(`User with ID: ${userId} does not exist.`,
      );
    }
    return {
      message: `A user with ID: ${userId} has been updated successfully`,
    };
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ 
      _id: userId
    }).exec();
    if (result.deletedCount​ === 0) {
      throw new NotFoundException(`User with ID: ${userId} does not exist.`);
    }
    return {
      message: `A user with ID: ${userId} has been deleted successfully`,
    };
  }
}