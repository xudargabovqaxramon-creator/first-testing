import { Test } from "@nestjs/testing";
import { UsersService } from "src/users/users.service";

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};


describe('UsersService', () => {
    let usersService: UsersService;
    let repo:any;

    beforeEach(async () => {
        const module = Test.createTestingModule({
            providers: [
                UsersService,
                {provide: 'UserRepository', useValue: mockUserRepository}]
        })
    })
});
