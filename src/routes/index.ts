import { Router } from 'express';
import authorization from './v1/authorization';
import verify from '../helpers/gcashAuthCode';

export const v1: Router = Router();

/* MIDDLEWARE FOR AUTHENTICATION */
v1.use(verify);
v1.use('/authorization', authorization);