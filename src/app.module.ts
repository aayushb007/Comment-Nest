import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://aayush:aayush@cluster0.lxg9jsp.mongodb.net/'),
    AuthModule,
    UserModule,
    CommentModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-here',
      signOptions: { expiresIn: '1d' },
    }),
    ChatModule
  ],
})
export class AppModule {}
