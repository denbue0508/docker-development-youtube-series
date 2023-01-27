import { Router } from 'express';
import payment from './v1/payment';
import refund from './v1/refund';
import transaction from './v1/transaction';
// import verifyToken from '../helpers/verifyToken';

export const v1: Router = Router();

v1.use('/payment', payment);
v1.use('/refund', refund);
v1.use('/transaction', transaction);