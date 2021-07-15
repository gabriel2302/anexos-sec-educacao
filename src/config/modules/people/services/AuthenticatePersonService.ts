import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import Person from '../infra/typeorm/entities/Person';
import IPeopleRepository from '../repositories/IPeopleRepository';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  person: Person;
  token: string;
}

@injectable()
class AuthenticatePersonService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const person = await this.peopleRepository.findByEnrollment(username);
    if (!person) {
      throw new AppError('Incorrect username/password combination', 401);
    }
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      person.password,
    );
    if (!passwordMatched) {
      throw new AppError('Incorrect username/password combination', 401);
    }
    const { secret, expiresIn } = authConfig.jwt;

    // Coloca a permissao e id da instituicao no token payload
    const token = sign(
      { role: person.role, institution: person.institution_id },
      secret,
      {
        subject: person.id,
        expiresIn,
      },
    );
    return {
      person,
      token,
    };
  }
}

export default AuthenticatePersonService;
