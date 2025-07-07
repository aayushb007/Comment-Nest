import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtStrategyClass } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyClass) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || 'your-secret-key-here',
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    
    // if (!payload.sub) {
    //   throw new UnauthorizedException('Invalid token payload');
    // }

    const user = await this.userService.findByEmail(payload.email);
    console.log(user);
    
    if (!user) {
      console.error('User not found:', payload.email);
      throw new UnauthorizedException('User not found');
    }
    
    if (!user.isActive) {
      console.error('User account is not active:', payload.email);
      throw new UnauthorizedException('Account is not active');
    }
    
    return user;
  }
}
