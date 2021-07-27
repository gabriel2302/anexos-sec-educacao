import AppError from '@shared/errors/AppError';

import FakeInstitutionsRepository from '../repositories/fakes/FakeInstitutionsRepository';
import UpdateInstitutionService from './UpdateInstitutionService';

let fakeInstitutionsRepository: FakeInstitutionsRepository;
let updateInstitution: UpdateInstitutionService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeInstitutionsRepository = new FakeInstitutionsRepository();
    updateInstitution = new UpdateInstitutionService(
      fakeInstitutionsRepository,
    );
  });

  it('should be able to update the institution', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'director',
      learning_kind: 'eja',
      name: 'name',
    });

    const updatedInstitution = await updateInstitution.execute({
      id: institution.id,
      director: 'other director',
      learning_kind: 'other',
      name: 'other name',
    });

    expect(updatedInstitution.name).toBe('other name');
    expect(updatedInstitution.director).toBe('other director');
    expect(updatedInstitution.learning_kind).toBe('other');
  });

  it('should be able to update the institution only obrigatories parameters', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'director',
      learning_kind: 'eja',
      name: 'name',
    });

    const updatedInstitution = await updateInstitution.execute({
      id: institution.id,
    });

    expect(updatedInstitution.name).toBe('name');
    expect(updatedInstitution.director).toBe('director');
    expect(updatedInstitution.learning_kind).toBe('eja');
  });

  it('should not be able update the institution from non-existing institution', async () => {
    await expect(
      updateInstitution.execute({
        id: 'non-existent-institution',
        director: 'director',
        learning_kind: 'eja',
        name: 'name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the institution with same name from another', async () => {
    await fakeInstitutionsRepository.create({
      director: 'director',
      learning_kind: 'eja',
      name: 'name',
    });

    const institution2 = await fakeInstitutionsRepository.create({
      director: 'director',
      learning_kind: 'eja',
      name: 'name2',
    });
    await expect(
      updateInstitution.execute({
        id: institution2.id,
        director: 'director2',
        learning_kind: 'other',
        name: 'name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
