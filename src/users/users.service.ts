import { Injectable } from '@nestjs/common';
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

  findAll() {
    const users = this.userModel.find();

    return users;
  }

  findOne(id: string) {
    const user = this.userModel.findById(id);

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, updateUserDto)
      .setOptions({ new: true });

    return user;
  }

  async remove(id: string) {
    const delUser = await this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();

    return delUser;
  }
}
