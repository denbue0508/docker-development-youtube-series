import { Router } from 'express';
import Controller from '../../controller/Transaction';


const transaction: Router = Router();
const controller = new Controller();

/* BYPASS MIDDLEWARE FOR AUTHENTICATION */
transaction.post('/', controller.post);
transaction.get('/', controller.get);



export default transaction;
