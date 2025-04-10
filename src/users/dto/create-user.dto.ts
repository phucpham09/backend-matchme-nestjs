import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

class MemberData {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;
}

export class CreateUserDto {
  @ApiProperty({ minimum: 4 })
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  passwordHash: string;

  @ApiProperty({ type: MemberData })
  @ValidateNested()
  @IsOptional()
  @Type(() => MemberData)
  memberData?: MemberData;
}
