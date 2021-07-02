import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListAllUsersService from './ListAllUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listAllUsers: ListAllUsersService;

describe('ListAllUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listAllUsers = new ListAllUsersService(fakeUsersRepository);
  });

  it('should be able to list all users', async () => {
    const user1 = await fakeUsersRepository.create({
      institution_id: 'id',
      password: 'password',
      username: 'username',
      role: 'adm',
    });

    const user2 = await fakeUsersRepository.create({
      institution_id: 'id2',
      password: 'password2',
      username: 'username2',
      role: 'user',
    });

    const users = await listAllUsers.execute();

    expect(users).toEqual([user1, user2]);
  });
});
