import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }): Promise<{ token: string }> {
    const user = await this.userService.validateUser(credentials.email, credentials.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const payload = {
      email: user.email
    };
    
    return { token: this.jwtService.sign(payload) };
  }
}
