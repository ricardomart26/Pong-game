import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res, UseInterceptors, UploadedFile, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Express } from 'express';

@Controller('user')
export class UserController {
    
  constructor(private userService: UserService) {}
  
  @Get()
  async getAllUsers(): Promise<User[]>{
    return await this.userService.getAllUsers();
  }
 
  @Post()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('avatar'))
  async createUser(@Body() userData: CreateUserDto, @UploadedFile() file: Express.Multer.File, @Res() response: Response): Promise<Response<User>> {
    return await this.userService.createUser(JSON.parse(userData["user_data"]), response, file);
  }
  
  @Post('python')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('avatar'))
  async createUserPython(@Body() userData: CreateUserDto, @UploadedFile() file: Express.Multer.File, @Res() response: Response): Promise<Response<User>> {
    return await this.userService.createUser(userData, response, file);
  }
  
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User> {
    return this.userService.findOneById(+id);
  }
  
  @Get('username/:username')
  async findOneByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.userService.findOneByUsername(username);
    console.log(user);
    return user;
  }

  // @Get('/userbynick/:nick')
  // async findOneByNick(@Param('nick') nick: string, @Res() response: Response): Promise<Response<User | string>> {
  //   return await this.userService.findOneByNick(nick, response);
  // }
    
  @Patch('/update/:id')
  @UsePipes(ValidationPipe)
  async updateUser(@Param('id') id: string, updateUser: UpdateUserDto): Promise<UpdateResult> {
    return await this.userService.updateUser(+id, updateUser);
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteUser(+id);
  }
  
}
