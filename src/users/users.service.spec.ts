import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('Test user service', () => {
  let prisma: PrismaService;
  let userService: UsersService;

  const userArray = [
    {
      id: '1',
      name: 'user1',
      email: '1@gmail.com',
    },
    {
      id: '2',
      name: 'user2',
      email: '2@gmail.com',
    },
  ];

  const anUser = userArray[0];

  const mockPrisma = {
    user: {
      findUnique: jest.fn().mockResolvedValue(anUser),
      findMany: jest.fn().mockResolvedValue(userArray),
    },
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);
    userService = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('Should be return an array', async () => {
      const result = await userService.findAll();
      expect(prisma.user.findMany).toHaveBeenCalled();
      expect(result).toEqual(userArray);
    });
  });

  describe('findOneUser', () => {
    it('Should be return an user', async () => {
      const result = await userService.findOne('an id');
      expect(prisma.user.findUnique).toHaveBeenCalled();
      expect(result).toEqual(anUser);
    });
  });
});
