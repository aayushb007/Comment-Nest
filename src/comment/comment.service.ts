// import { CommentDocument } from "./schemas/comment.schema";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Model } from "mongoose";
import { CommentDocument } from "./schemas/comment.schema";
import { Comment } from "./schemas/comment.schema";

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
      ) {}


      async create(createCommentDto: CreateCommentDto): Promise<CommentDocument> {
        const createdComment = new this.commentModel(createCommentDto);
        return createdComment.save();
      }

  
      async findAll(): Promise<CommentDocument[]> {
        try {
          console.log("Finding all comments");
          const comments = await this.commentModel.find().populate('user', 'email').lean().exec();
          console.log("Found comments:", comments);
          return comments;
        } catch (error) {
          console.error("Error finding comments:", error);
          throw error;
        }
      }

      async findOne(id: string): Promise<CommentDocument> {
        return this.commentModel.findById(id).exec();
      }

      async update(id: string, updateCommentDto: CreateCommentDto): Promise<CommentDocument> {
        return this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true }).exec();
      }

      async remove(id: string): Promise<CommentDocument> {
        return this.commentModel.findByIdAndDelete(id).exec();
      }
}