import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService, // Inject AuthService
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    // Create the user
    const user = await this.userService.createUser(createUserDto);
    const token = await this.authService.login(user);

    return {
      user,
      ...token,
    };
  }
}
