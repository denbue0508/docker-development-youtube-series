import { Router } from 'express';
import Controller from '../../controller/Payment';

const payment: Router = Router();
const controller = new Controller();

payment.post('/', controller.create);

// payment.get('/', controller.get);

export default payment;
