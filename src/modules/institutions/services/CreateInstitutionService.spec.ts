import AppError from '@shared/errors/AppError';
import FakeInstitutionsRepository from '../repositories/fakes/FakeInstitutionsRepository';
import CreateInstitutionService from './CreateInstitutionService';

let fakeInstitutionRepository: FakeInstitutionsRepository;
let createInstitution: CreateInstitutionService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeInstitutionRepository = new FakeInstitutionsRepository();
    createInstitution = new CreateInstitutionService(fakeInstitutionRepository);
  });

  it('should be able to create a new institution', async () => {
    const institution = await createInstitution.execute({
      director: 'director',
      learning_kind: 'eja',
      name: 'institute xavier',
    });

    expect(institution).toHaveProperty('id');
    expect(institution.name).toEqual('institute xavier');
  });

  it('should not be able to create a new institution with same name from another', async () => {
    await createInstitution.execute({
      director: 'director',
      learning_kind: 'eja',
      name: 'institute xavier',
    });

    await expect(
      createInstitution.execute({
        director: 'director 2',
        learning_kind: 'eja',
        name: 'institute xavier',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
