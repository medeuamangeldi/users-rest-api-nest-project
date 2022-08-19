/* eslint-disable */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), UsersModule, MongooseModule.forRoot(process.env.DB_USER)],
  controllers: [],
  providers: [],
})
export class AppModule {}
