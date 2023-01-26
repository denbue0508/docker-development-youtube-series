import { Router } from 'express';
import Controller from '../../controller/Refund';
import verifyToken from '../../helpers/verifyToken';


const refund: Router = Router();
const controller = new Controller();

/* MIDDLEWARE FOR AUTHENTICATION */
refund.use(verifyToken);
refund.post('/', controller.create);
refund.post('/inquiry', controller.inquiry);


export default refund;
