import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/login.decor';
@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({
    type: CreateUserDto,
    examples: {
      default: {
        value: {
          name: 'user1',
          email: '1@gmail.com',
          passwordHash: '12345',
          memberData: {
            name: 'user1.',
            gender: 'male',
            dateOfBirth: '2003-09-07',
            city: 'HaNoi',
            country: 'Ecuador',
          },
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: User,
    description: 'Registered successfully!',
  })
  @ApiResponse({
    status: 400,
    description: 'Ensure the format of your input data!',
  })
  @ApiResponse({ status: 500, description: 'Email existed' })
  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiBody({
    type: LoginDto,
    examples: {
      default: {
        value: {
          email: '1@gmail.com',
          password: '12345',
        },
      },
    },
  })
  @Public()
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  getUserProfile(@Req() req) {
    return req.user;
  }
}
