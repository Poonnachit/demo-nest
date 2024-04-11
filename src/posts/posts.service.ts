import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model, Types } from 'mongoose';
import { Post } from './entities/post.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/entities/user.entity';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userModel.findById(createPostDto.userId);
    if (!user) {
      throw new Error('User not found');
    }
    console.log(user);
    return await this.postModel.create(createPostDto);
  }

  findAll(query: QueryDto) {
    const filter = [];
    if (query.q) {
      filter.push({ $match: { title: { $regex: query.q, $options: 'i' } } });
    }
    if (query.limit) {
      filter.push({ $limit: parseInt(query.limit) });
    }
    if (query.skip) {
      filter.push({ $skip: query.skip });
    }
    return this.postModel.aggregate(filter);
  }

  findOne(id: Types.ObjectId) {
    return this.postModel.findById(id);
  }

  findByUserId(userId: Types.ObjectId) {
    return this.postModel.find({ userId: userId }).exec();
  }

  update(id: Types.ObjectId, updatePostDto: UpdatePostDto) {
    return this.postModel.updateOne({ _id: id }, updatePostDto);
  }

  remove(id: Types.ObjectId) {
    return this.postModel.deleteOne({ _id: id });
  }
}
