import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Person from '@modules/people/infra/typeorm/entities/Person';
import IPeopleRepository from '../repositories/IPeopleRepository';

interface IRequest {
  person_id: string;
  name?: string;
  office?: string;
  enrollment?: string;
  occupation?: string;
  functional_situation?: string;
}

@injectable()
class UpdatePersonService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  public async execute(data: IRequest): Promise<Person> {
    const person = await this.peopleRepository.findById(data.person_id);
    if (!person) {
      throw new AppError('Person not found');
    }
    if (data.name) person.name = data.name;

    if (data.enrollment) {
      const checkEnrollmentExists =
        await this.peopleRepository.findByEnrollment(data.enrollment);
      if (
        checkEnrollmentExists &&
        checkEnrollmentExists.enrollment !== person.enrollment
      ) {
        throw new AppError('User enrollment already in use');
      }
      person.enrollment = data.enrollment;
    }

    if (data.occupation) person.occupation = data.occupation;
    if (data.office) person.office = data.office;
    if (data.functional_situation)
      person.functional_situation = data.functional_situation;

    return this.peopleRepository.save(person);
  }
}

export default UpdatePersonService;
