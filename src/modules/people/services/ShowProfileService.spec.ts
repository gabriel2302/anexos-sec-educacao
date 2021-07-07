import AppError from '@shared/errors/AppError';
import FakePeopleRepository from '../repositories/fakes/FakePeopleRepository';

import ShowProfileService from './ShowProfileService';

let fakePeopleRepository: FakePeopleRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    showProfile = new ShowProfileService(fakePeopleRepository);
  });

  it('should be able show the profile', async () => {
    const person = await fakePeopleRepository.create({
      password: 'enrollment',
      institution_id: 'instituition_id',
      role: 'user',
      enrollment: 'enrollment',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
      username: 'enrollment',
    });

    const profile = await showProfile.execute(person.id);

    expect(profile.username).toBe('enrollment');
    expect(profile.role).toBe('user');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
