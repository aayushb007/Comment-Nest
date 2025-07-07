import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentDocument } from "./schemas/comment.schema";

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createCommentDto: CreateCommentDto): Promise<CommentDocument> {
      return this.commentService.create(createCommentDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(): Promise<CommentDocument[]> {
      return this.commentService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param('id') id: string): Promise<CommentDocument> {
      return this.commentService.findOne(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: string, @Body() updateCommentDto: CreateCommentDto): Promise<CommentDocument> {
      return this.commentService.update(id, updateCommentDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param('id') id: string): Promise<CommentDocument> {
      return this.commentService.remove(id);
    }
}