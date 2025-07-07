import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CacheModule } from '@nestjs/cache-manager';
import { CommentGateway } from './comment.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-here',
      signOptions: { expiresIn: '1d' },
    }),
    CacheModule.register({
      ttl: 300, // Cache TTL in seconds (5 minutes)
      max: 1000, // Maximum number of items in cache
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentGateway],
  exports: [CommentService],
})
export class CommentModule {}