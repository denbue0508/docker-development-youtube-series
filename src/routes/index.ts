import { Router } from 'express';
import payment from './v1/payment';
// import device from './v1/device';
import authorization from './v1/authorization';
import verifyToken from '../helpers/verifyToken';

export const v1: Router = Router();

/* MIDDLEWARE FOR AUTHENTICATION */
v1.use(verifyToken);

v1.use('/payment', payment);
v1.use('/authorization', authorization);