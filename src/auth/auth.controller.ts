import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({
    type: CreateUserDto,
    examples: {
      default: {
        value: { name: 'user1', email: '1@gmail.com', passwordHash: '12345' },
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
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
}
