import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper';
import { Controller, HttpResponse } from '@/presentation/interfaces';
import { UCCreateLoginPortal } from '@/domain/usecases/login-portal';
import { MissingParamError } from '@/presentation/errors/missing-param';

export class CreateLoginPortalController implements Controller {
   constructor(private readonly ucCreateLogin: UCCreateLoginPortal) {}
   async handle(httpRequest: any): Promise<HttpResponse> {
      const { body } = httpRequest;
      if (!body.userkey) return forbidden(new MissingParamError('userkey'));
      if (!body.password) return forbidden(new MissingParamError('password'));
      if (!body.typeconfirmation)
         return forbidden(new MissingParamError('typeconfirmation'));
      if (
         body.typeconfirmation !== 'E' &&
         body.typeconfirmation !== 'S' &&
         body.typeconfirmation !== 'L'
      )
         return serverError(new Error('field typeconfirmation is invalid!'));
      if (!body.typeuserkey)
         return forbidden(new MissingParamError('typeuserkey'));
      if (
         body.typeuserkey !== 'E' &&
         body.typeuserkey !== 'D' &&
         body.typeuserkey !== 'T'
      )
         return serverError(new Error('field typeuserkey is invalid!'));

      const response = await this.ucCreateLogin.create(body);
      if (response.created) return ok(response);
      return serverError(new Error(response.errorMessage));
   }
}
