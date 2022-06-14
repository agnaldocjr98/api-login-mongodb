import { Router } from 'express';
import { makeCreateLoginPortal } from '@/main/factories/login-portal';
import { AdaptRoute } from '../route-adapter';

export default (router: Router): void => {
   router.post('/create-login-portal', AdaptRoute(makeCreateLoginPortal()));
};
