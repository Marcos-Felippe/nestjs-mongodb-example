import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {

    const user = new this.userModel(createUserDto);

    return user.save();
  }

  async findAll() {
    const users = await this.userModel.find();

    return users;
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id);

      return user;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Usuario ${id} não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    try {
      const user = await this.userModel
        .findByIdAndUpdate(id, updateUserDto)
        .setOptions({ new: true });

      return user;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Erro ao tentar atualizar o usuario ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const delUser = await this.userModel
        .deleteOne({
          _id: id,
        })
        .exec();

      return delUser;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Erro ao tentar deletar o usuario ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
