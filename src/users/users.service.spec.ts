import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'user1',
      email: '1@gmail.com',
      emailVerified: new Date(),
      image: '',
      passwordHash: 'asdfjskdfsdfasdf',
      profileComplete: true,
      role: 'MEMBER',
    },
    {
      id: '2',
      name: 'user2',
      email: '2@gmail.com',
      emailVerified: new Date(),
      image: '',
      passwordHash: 'asdfjskdfsdfasdf',
      profileComplete: true,
      role: 'MEMBER',
    },
  ];
  const mockPrismaService = {
    user: {
      findMany: jest.fn().mockResolvedValue(mockUsers),
      count: jest.fn().mockResolvedValue(mockUsers.length),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users with total', async () => {
      const result = await service.findAll(); // your service should wrap the result
      expect(result).toEqual(mockUsers);
      // expect(result.total).toEqual(mockUsers.length);
      expect(prisma.user.findMany).toHaveBeenCalled();
      // expect(prisma.user.count).toHaveBeenCalled();
    });
  });
});
