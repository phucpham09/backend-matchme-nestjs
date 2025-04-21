import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOneByEmail(email);
    const valid = bcrypt.compare(user?.passwordHash, password);
    if (!valid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
