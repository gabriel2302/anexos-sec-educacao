import AppError from '@shared/errors/AppError';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import UpdateStudentService from './UpdateStudentService';

let updateStudent: UpdateStudentService;
let fakeStudentsRepository: FakeStudentsRepository;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    updateStudent = new UpdateStudentService(fakeStudentsRepository);
  });

  it('should be able to update the student', async () => {
    const student = await fakeStudentsRepository.create({
      name: 'student',
      birthdate: new Date('1999-05-02'),
    });
    const updatedStudent = await updateStudent.execute({
      id: student.id,
      birthdate: new Date('2000-02-05'),
      name: 'other student',
    });
    expect(updatedStudent.name).toBe('other student');
    expect(updatedStudent.birthdate).toEqual(new Date('2000-02-05'));
  });

  it('should not be able update the student info from a non-existing student', async () => {
    await expect(
      updateStudent.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
