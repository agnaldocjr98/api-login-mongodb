import { Router } from 'express';
import { makeAccomplishLoginPortal } from '../factories/login-portal';
import { AdaptRoute } from '../route-adapter';

export default (router: Router): void => {
   router.post(
      '/accomplish-login-portal',
      AdaptRoute(makeAccomplishLoginPortal())
   );
};
