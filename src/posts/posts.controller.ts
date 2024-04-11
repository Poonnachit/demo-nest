import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Types } from 'mongoose';
import { QueryDto } from './dto/query.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    try {
      return this.postsService.create(createPostDto);
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.postsService.findAll(query);
    // return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.postsService.findOne(id);
  }

  @Get('/user/:userId')
  findByUserId(@Param('userId') id: Types.ObjectId) {
    return this.postsService.findByUserId(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.postsService.remove(id);
  }
}
