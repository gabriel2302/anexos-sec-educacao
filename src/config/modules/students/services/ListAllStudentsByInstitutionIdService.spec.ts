import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import ListAllStudentsByInstitutionIdService from './ListAllStudentsByInstitutionIdService';

let fakeStudentsRepository: FakeStudentsRepository;
let listAllStudentsByInstitutionId: ListAllStudentsByInstitutionIdService;

describe('ListAllStudentsByInstitutionId', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    listAllStudentsByInstitutionId = new ListAllStudentsByInstitutionIdService(
      fakeStudentsRepository,
    );
  });

  it('should be able to list all students', async () => {
    const student1 = await fakeStudentsRepository.create({
      institution_id: 'institution',
      birthdate: new Date(),
      name: 'any_name',
    });
    const student2 = await fakeStudentsRepository.create({
      institution_id: 'institution',
      birthdate: new Date(),
      name: 'other_name',
    });

    const students = await listAllStudentsByInstitutionId.execute({
      institution: 'institution',
    });

    expect(students).toEqual([student1, student2]);
  });
});
