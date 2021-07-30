import IPeopleRepository from '@modules/people/repositories/IPeopleRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Classroom from '../infra/typeorm/entities/Classroom';
import IClassroomsRepository from '../repositories/IClassroomsRepository';

interface IPerson {
  id: string;
}

interface IRequest {
  name: string;
  year: string;
  shift: string;
  institution: string;
  people: IPerson[];
}

@injectable()
class CreateClassroomService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,

    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  public async execute({
    name,
    shift,
    year,
    institution,
    people,
  }: IRequest): Promise<Classroom> {
    const checkClassroomExists = await this.classroomsRepository.findByName(
      name,
    );
    if (checkClassroomExists) {
      throw new AppError(`Class name's already in use`);
    }
    const peopleIds = people.map(person => ({
      id: person.id,
    }));

    const originalPeople = await this.peopleRepository.findAllPeopleById(
      peopleIds,
    );

    const classroomPeople = people.map(person => {
      const originalPerson = originalPeople.find(
        findPerson => findPerson.id === person.id,
      );

      if (!originalPerson) {
        throw new AppError('Teacher not found');
      }
      return {
        person_id: originalPerson.id,
      };
    });

    const classroom = await this.classroomsRepository.create({
      name,
      shift,
      year,
      people: classroomPeople,
      institution_id: institution,
    });

    return classroom;
  }
}

export default CreateClassroomService;
