import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./../users/entities/user.entity";
import { UsersService } from "./../users/users.service";

const mockRepo = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};


describe('UsersService', () => {
    let Service: UsersService;
    let repo:any;

    beforeEach(async () => {
        const module =await Test.createTestingModule({
            providers: [
                UsersService,
                {provide: getRepositoryToken(User), useFactory: () => mockRepo}
            ]
        }).compile();

        Service = module.get<UsersService>(UsersService);
        repo = module.get(getRepositoryToken(User));
    })


    it("create user", async () => {
        const createUserDto = {name: "qaxramon", email: "khaxramon.com"};
        const user = {id: 1, ...createUserDto};
        repo.create.mockReturnValue(user);
        repo.save.mockResolvedValue(user);

        expect(await Service.create(createUserDto)).toEqual(user);
    });


    it("find all users", async () => {
        const users = [{id: 1, name: "qaxramon", email: "khaxramon.com"}];
        repo.find.mockResolvedValue(users);
        expect(await Service.findAll()).toHaveLength(users.length);
    });



    it("find one user", async () => {
        const user = {id: 1, name: "qaxramon", email: "khaxramon.com"};
        repo.findOne.mockResolvedValue(user);

        expect(await Service.findOne(1)).toEqual(user); 
    });
it("update user", async () => {
    const oldUser = { id: 1, name: "qaxramon", email: "khaxramon.com" };
    const updateUserDto = { name: "Kaxa", email: "@khaxramon.com" };
    const updatedUser = { id: 1, ...updateUserDto };

    repo.findOne.mockResolvedValueOnce(oldUser);
    repo.save.mockResolvedValue(updatedUser);

    const result = await Service.update(1, updateUserDto);

    // Tekshiramiz
    expect(result).toEqual(updatedUser);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repo.save).toHaveBeenCalled();
});

    it("remove user", async () => {
        const user = {id: 1, name: "qaxramon", email: "khaxramon.com"};
        repo.findOne.mockResolvedValue(user);
        repo.remove.mockResolvedValue(undefined);

        await expect(Service.remove(1)).resolves.toBeUndefined();
    });
    


   it("throw error", async () => {
    repo.findOne.mockResolvedValue(null);

   await expect(Service.findOne(999)).rejects.toThrow(`User with id 999 not found`);
   });
});
