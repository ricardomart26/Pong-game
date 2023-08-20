import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Response } from 'express';
import { Multer } from 'multer';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  
  async createUser(userDto: CreateUserDto, response: Response, file: Express.Multer.File): Promise<Response<User>> {
    let earror=false;

    const user = await this.userRepository.findOneBy({nick: userDto.username});
    if (user) {
      console.log("User already exist with this parameters:",user);
      return response.status(250).send({message:"Error - nick already exist", user: user});
    }

    userDto.avatar = file.filename;
    const createdUser = this.userRepository.create(userDto);   

    const newUser = await this.userRepository.insert(createdUser).catch((Error) => {
      earror = true;
      // return response.status(260).send({message: `Please check parameters: ${Error}`, user: newUser});
    });
    if(!earror)
      return response.status(200).send({message: "User Created Successfuly", user: createdUser});
    return response.status(260).send({message: `Please check parameters: ${Error}`, user: createdUser});
    
  }

  async getUserFriends(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({nick: username});
  }

  async findOneByNick(nick: string, response: Response): Promise<Response<string | User>> {
    const user = await this.userRepository.findOneBy({nick: nick})
    if (!user)
      return response.status(250).send("User not found");
    return response.status(200).send(user);
  }

  async findOneById(userId: number): Promise<User> {
    return await this.userRepository.findOne({where: {id: userId}});
  }

  async updateUser(userId: number, updateUser: UpdateUserDto): Promise<UpdateResult> {
    const user: User = await this.userRepository.findOne({
      where: {
        id: userId,
      }
    });
    return await this.userRepository.update(userId, updateUser);
  }

  async deleteUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    return await this.userRepository.remove(user)
  }

}