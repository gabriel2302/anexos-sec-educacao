import AppError from '@shared/errors/AppError';
import FakePeopleRepository from '../repositories/fakes/FakePeopleRepository';
import ListAllPeopleService from './ListAllPeopleService';

let fakePeopleRepository: FakePeopleRepository;
let listAllPeople: ListAllPeopleService;

describe('ListAllPeople', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    listAllPeople = new ListAllPeopleService(fakePeopleRepository);
  });

  it('should be able to list all people if user is superadm', async () => {
    const person1 = await fakePeopleRepository.create({
      password: 'enrollment',
      institution_id: 'instituition_id',
      role: 'superadm',
      enrollment: 'enrollment',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
      username: 'username',
    });

    const person2 = await fakePeopleRepository.create({
      password: 'enrollment',
      institution_id: 'instituition_id',
      role: 'user',
      enrollment: 'enrollment2',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
      username: 'username2',
    });

    const people = await listAllPeople.execute({
      role: person1.role,
    });

    expect(people).toEqual([person1, person2]);
  });

  it('should not be able to list all people if user isn`t superadm', async () => {
    const person1 = await fakePeopleRepository.create({
      password: 'enrollment',
      institution_id: 'instituition_id',
      role: 'any_role',
      enrollment: 'enrollment',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
      username: 'username',
    });

    await expect(
      listAllPeople.execute({
        role: person1.role,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
