import FakeInstitutionsRepository from '../repositories/fakes/FakeInstitutionsRepository';
import ListAllInstitutionsService from './ListAllInstitutionsService';

let fakeInstitutionsRepository: FakeInstitutionsRepository;
let listAllInstitutions: ListAllInstitutionsService;

describe('ListAllUsers', () => {
  beforeEach(() => {
    fakeInstitutionsRepository = new FakeInstitutionsRepository();
    listAllInstitutions = new ListAllInstitutionsService(
      fakeInstitutionsRepository,
    );
  });

  it('should be able to list all institutions', async () => {
    const institution1 = await fakeInstitutionsRepository.create({
      director: 'director',
      learning_kind: 'eja',
      name: 'name',
    });

    const institution2 = await fakeInstitutionsRepository.create({
      director: 'director2',
      learning_kind: 'eja',
      name: 'name2',
    });

    const institutions = await listAllInstitutions.execute();

    expect(institutions).toEqual([institution1, institution2]);
  });
});
