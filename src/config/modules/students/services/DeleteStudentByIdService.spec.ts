import AppError from '@shared/errors/AppError';
import DeleteStudentByIdService from './DeleteStudentByIdService';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';

let fakeStudentsRepository: FakeStudentsRepository;
let deleteStudentById: DeleteStudentByIdService;

describe('DeleteStudentById', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    deleteStudentById = new DeleteStudentByIdService(fakeStudentsRepository);
  });

  it('should be delete a student by id', async () => {
    const student = await fakeStudentsRepository.create({
      name: 'student',
      birthdate: new Date('1999-05-02'),
    });

    const student2 = await fakeStudentsRepository.create({
      name: 'student',
      birthdate: new Date('1999-05-02'),
    });
    await deleteStudentById.execute(student.id);
    const students = await fakeStudentsRepository.findAll();
    expect(students).toEqual([student2]);
  });

  it('should not be delete a student if not exists', async () => {
    await expect(
      deleteStudentById.execute('id-non-exists'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
