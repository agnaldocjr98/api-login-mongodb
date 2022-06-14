import {
   AccomplishLoginPortalParams,
   UCAccomplishLoginPortal,
} from '@/domain/usecases/login-portal';
import { MissingParamError } from '../../errors/missing-param';
import {
   forbidden,
   ok,
   serverError,
   unauthorized,
} from '@/presentation/helpers/http-helper';
import { Controller } from '@/presentation/interfaces/controller';
import { HttpResponse } from '@/presentation/interfaces/http';

export class AccomplishLoginPortalController implements Controller {
   constructor(
      private readonly accomplishloginportal: UCAccomplishLoginPortal
   ) {}
   async handle(httpRequest: any): Promise<HttpResponse> {
      const { body }: { body: AccomplishLoginPortalParams } = httpRequest;
      if (!body.userkey) return forbidden(new MissingParamError('userkey'));
      if (!body.password) return forbidden(new MissingParamError('password'));

      try {
         const response = await this.accomplishloginportal.accomplish(body);
         if (response.isAuthenticated) return ok(response);
         if (response.errorMessage?.includes('Inválidas')) {
            return unauthorized();
         }
         return serverError(new Error(response.errorMessage));
      } catch (error: any) {
         return serverError(error);
      }
   }
}
