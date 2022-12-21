import { Router } from 'express';
import Controller from '../../controller/Authorization';

const authorization: Router = Router();
const controller = new Controller();

authorization.post('/', controller.applyToken);

// payment.get('/', controller.get);

export default authorization;
