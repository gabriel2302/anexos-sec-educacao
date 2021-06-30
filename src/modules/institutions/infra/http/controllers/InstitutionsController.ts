import CreateInstitutionService from '@modules/institutions/services/CreateInstitutionService';
import ListAllInstitutionsService from '@modules/institutions/services/ListAllInstitutionsService';
import UpdateInstitutionService from '@modules/institutions/services/UpdateInstitutionService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class InstitutionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, director, learning_kind } = request.body;
    const createInstitution = container.resolve(CreateInstitutionService);
    const newInstitution = await createInstitution.execute({
      name,
      director,
      learning_kind,
    });
    return response.json(classToClass(newInstitution));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, director, learning_kind } = request.body;
    const { id } = request.params;
    const updateInstitution = container.resolve(UpdateInstitutionService);
    const institution = await updateInstitution.execute({
      name,
      director,
      learning_kind,
      id,
    });
    return response.json(classToClass(institution));
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listAllInstitutions = container.resolve(ListAllInstitutionsService);
    const institutions = await listAllInstitutions.execute();
    return response.json(classToClass(institutions));
  }
}
export default InstitutionsController;
