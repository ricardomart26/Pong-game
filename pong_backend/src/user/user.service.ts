import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Response, response } from 'express';
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
    console.log("Creating user...");
    const user = await this.userRepository.findOneBy({username: userDto.username});
    if (user)
      return response.status(250).send({message:"Error - nick already exist", user: user});

    userDto.avatar = file.filename;
    const createdUser = this.userRepository.create(userDto);   
    console.log("createdUser", createdUser);
    await this.userRepository.insert(createdUser).catch((Error) => {
      earror = true;
    });
    if(!earror)
      return response.status(200).send({message: "User Created Successfuly", user: createdUser});
    return response.status(260).send({message: `Please check parameters: ${Error}`, user: createdUser});
    
  }

  async getUserFriends(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({username: username});
    console.log(user);
    console.log(await this.userRepository.find());
    if (!user)
    {
      console.log(``);
      throw new NotFoundException(`User ${username} not found`);
    }
    return user
    // return (user ? response.status(HttpStatus.FOUND).json(user).send() : response.status(HttpStatus.NOT_FOUND).send());
  }

  // async findOneByNick(nick: string, response: Response): Promise<Response<string | User>> {
  //   const user = await this.userRepository.findOneBy({nick: nick})
  //   if (!user)
  //     return response.status(250).send("User not found");
  //   return response.status(200).send(user);
  // }

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
