import { Router } from 'express';
import authorization from './v1/authorization';
import verifyAuthCode from '../helpers/verifyAuthCode';

export const v1: Router = Router();

/* MIDDLEWARE FOR AUTHENTICATION */
v1.use(verifyAuthCode);
v1.use('/authorization', authorization);