import FakeInstitutionsRepository from '@modules/institutions/repositories/fakes/FakeInstitutionsRepository';
import AppError from '@shared/errors/AppError';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import CreateStudentService from './CreateStudentService';

let fakeStudentsRepository: FakeStudentsRepository;
let fakeInstitutionsRepository: FakeInstitutionsRepository;
let createStudent: CreateStudentService;

describe('CreateStudent', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeInstitutionsRepository = new FakeInstitutionsRepository();
    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeInstitutionsRepository,
    );
  });

  it('should be able to create a new student', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'any_director',
      learning_kind: 'any_learning_kind',
      name: 'any_name',
    });
    const student = await createStudent.execute({
      name: 'student',
      birthdate: new Date('1999-05-02'),
      institution: institution.id,
    });

    expect(student).toHaveProperty('id');
    expect(student.birthdate).toEqual(new Date('1999-05-02'));
    expect(student.institution_id).toEqual(institution.id);
  });

  it('should not be able to create a new student with institution inexistent', async () => {
    await expect(
      createStudent.execute({
        birthdate: new Date(),
        name: 'any_name',
        institution: 'any_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
