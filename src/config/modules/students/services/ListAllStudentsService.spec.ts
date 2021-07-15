import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import ListAllStudentsService from './ListAllStudentsService';

let fakeStudentsRepository: FakeStudentsRepository;
let listAllStudents: ListAllStudentsService;

describe('ListAllStudents', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    listAllStudents = new ListAllStudentsService(fakeStudentsRepository);
  });

  it('should be able to list all students', async () => {
    const student1 = await fakeStudentsRepository.create({
      name: 'student',
      birthdate: new Date('1999-05-02'),
    });

    const student2 = await fakeStudentsRepository.create({
      name: 'student2',
      birthdate: new Date('1999-05-02'),
    });

    const students = await listAllStudents.execute();

    expect(students).toEqual([student1, student2]);
  });
});
