import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MulterModule.register({ dest: './avatar_uploads'})],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
