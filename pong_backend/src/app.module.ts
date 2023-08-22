import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './config/typeorm.config';
import { User } from './user/user.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: "pong-database",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: [User],
    // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data
    synchronize: true 
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
