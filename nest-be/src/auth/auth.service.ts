import * as bcrypt from 'bcryptjs';

import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      console.log('AuthService.validateUser result:', result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
