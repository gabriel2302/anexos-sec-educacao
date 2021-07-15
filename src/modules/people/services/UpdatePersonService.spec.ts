import AppError from '@shared/errors/AppError';

import FakePeopleRepository from '../repositories/fakes/FakePeopleRepository';
import UpdatePersonService from './UpdatePersonService';

let fakePeopleRepository: FakePeopleRepository;
let updatePerson: UpdatePersonService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    updatePerson = new UpdatePersonService(fakePeopleRepository);
  });

  it('should be able to update a person', async () => {
    const person = await fakePeopleRepository.create({
      username: 'enrollment',
      password: 'enrollment',
      institution_id: 'instituition_id',
      role: 'user',
      enrollment: 'enrollment',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
    });

    const updatedPerson = await updatePerson.execute({
      person_id: person.id,
      functional_situation: 'other_situation',
      name: 'other_name',
      office: 'other_office',
      occupation: 'other_occupation',
    });

    expect(updatedPerson.functional_situation).toBe('other_situation');
    expect(updatedPerson.enrollment).toBe('enrollment');
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updatePerson.execute({
        person_id: 'non-existent-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the people if user enrollment already in use', async () => {
    const people = await fakePeopleRepository.create({
      username: 'enrollment',
      password: 'enrollment',
      institution_id: 'instituition_id',
      role: 'user',
      enrollment: 'enrollment',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
    });

    await fakePeopleRepository.create({
      username: 'enrollment',
      password: 'enrollment',
      institution_id: 'instituition_id',
      role: 'user',
      enrollment: 'enrollment2',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
    });
    await expect(
      updatePerson.execute({
        person_id: people.id,
        enrollment: 'enrollment2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
