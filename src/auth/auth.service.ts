import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    return this.userService.validateUser(username, password);
  }

  async login(user: any) {
    // Ensure we have the complete user object
    const completeUser = await this.userService.findByEmail(user.email);
    console.log(completeUser);
    
    const payload = {
      email: completeUser.email,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
