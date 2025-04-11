import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsers: User[] = [
    {
      id: 'abcde',
      email: 'user1@example.com',
      name: 'User One',
      passwordHash: 'hashedpassword1',
      emailVerified: new Date(),
      image: '',
      profileComplete: false,
      role: 'MEMBER',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue({
              data: mockUsers,
              total: mockUsers.length,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /users', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll();
      expect(result.data).toEqual(mockUsers);
      expect(result.total).toEqual(mockUsers.length);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
