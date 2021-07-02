import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import CreateStudentService from './CreateStudentService';

let fakeStudentsRepository: FakeStudentsRepository;
let createStudent: CreateStudentService;

describe('CreateStudent', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    createStudent = new CreateStudentService(fakeStudentsRepository);
  });

  it('should be able to create a new student', async () => {
    const student = await createStudent.execute({
      name: 'student',
      birthdate: new Date('1999-05-02'),
    });

    expect(student).toHaveProperty('id');
    expect(student.birthdate).toEqual(new Date('1999-05-02'));
  });
});
