import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateToken } from 'src/lib/generateToken';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword: string = await generateToken(
      createUserDto.passwordHash,
    );
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        passwordHash: hashedPassword,
        profileComplete: !!createUserDto.memberData,
        ...(createUserDto.memberData && {
          member: {
            create: {
              name: createUserDto.memberData.name,
              gender: createUserDto.memberData.gender,
              dateOfBirth: new Date(createUserDto.memberData.dateOfBirth),
              city: createUserDto.memberData.city,
              country: createUserDto.memberData.country,
              image: createUserDto.memberData.image,
              description: '',
            },
          },
        }),
      },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
