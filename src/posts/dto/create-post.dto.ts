import { Types } from 'mongoose';
import { IsMongoId, IsString } from 'class-validator';

export class CreatePostDto {
  @IsMongoId()
  userId: Types.ObjectId;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
