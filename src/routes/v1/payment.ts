import { Router } from 'express';
import Controller from '../../controller/Payment';
import verifyToken from '../../helpers/verifyToken';


const payment: Router = Router();
const controller = new Controller();

/* BYPASS MIDDLEWARE FOR AUTHENTICATION */
payment.post('/notify', controller.notify);


/* MIDDLEWARE FOR AUTHENTICATION */
payment.use(verifyToken);
payment.post('/', controller.create);
payment.get('/', controller.get);



export default payment;
