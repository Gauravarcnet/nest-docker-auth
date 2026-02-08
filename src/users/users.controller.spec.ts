import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  // create fake service
  const mockUsersService = {
    signup: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ---------------- SIGNUP TEST ----------------

  it('should call usersService.signup and return response', async () => {

    const dto = {
      email: 'test@test.com',
      name: 'gaurav',
      password: '123456',
    };

    const result = { message: 'Signup successful' };

    // define what fake service should return
    mockUsersService.signup.mockResolvedValue(result);

    const response = await controller.signup(dto as any);

    // verify service called
    expect(usersService.signup).toHaveBeenCalledWith(dto);

    // verify response returned
    expect(response).toEqual(result);
  });

  // ---------------- LOGIN TEST ----------------

  it('should call usersService.login and return user data', async () => {

    const dto = {
      email: 'test@test.com',
      password: '123456',
    };

    const result = {
      message: 'Login success',
      userId: 1,
      email: 'test@test.com',
    };

    mockUsersService.login.mockResolvedValue(result);

    const response = await controller.login(dto as any);

    expect(usersService.login).toHaveBeenCalledWith(dto);
    expect(response).toEqual(result);
  });
});
