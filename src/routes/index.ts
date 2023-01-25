import { Router } from 'express';
import payment from './v1/payment';
// import verifyToken from '../helpers/verifyToken';

export const v1: Router = Router();

v1.use('/payment', payment);
v1.use('/refund', payment);