import AppError from '@shared/errors/AppError';
import FakePeopleRepository from '../repositories/fakes/FakePeopleRepository';
import ListAllPeopleByIdService from './ListAllPeopleByIdService';

let fakePeopleRepository: FakePeopleRepository;
let listAllPeopleById: ListAllPeopleByIdService;

describe('ListAllPeople', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    listAllPeopleById = new ListAllPeopleByIdService(fakePeopleRepository);
  });

  it('should not be able to list all people of institution if user it isn`t adm', async () => {
    const person1 = await fakePeopleRepository.create({
      password: 'enrollment',
      institution_id: 'instituition_id',
      role: 'user',
      enrollment: 'enrollment',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
      username: 'username',
    });

    await expect(
      listAllPeopleById.execute({
        institution: person1.institution_id,
        role: person1.role,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to list all people of role its not provided', async () => {
  //   const person1 = await fakePeopleRepository.create({
  //     password: 'enrollment',
  //     institution_id: 'instituition_id',
  //     role: 'user',
  //     enrollment: 'enrollment',
  //     functional_situation: 'functional_situation',
  //     name: 'any_name',
  //     occupation: 'any_occupation',
  //     office: 'any_office',
  //     username: 'username',
  //   });

  //   await expect(
  //     listAllPeopleById.execute({
  //       institution: person1.institution_id,
  //       role: person1.role,
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });

  it('should be able to list all people if user is adm', async () => {
    const person1 = await fakePeopleRepository.create({
      password: 'enrollment',
      institution_id: 'instituition_id',
      role: 'adm',
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

    const people = await listAllPeopleById.execute({
      institution: person1.institution_id,
      role: person1.role,
    });

    expect(people).toEqual([person1, person2]);
  });
});
