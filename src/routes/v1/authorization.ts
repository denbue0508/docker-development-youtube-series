import { Router } from 'express';
import Controller from '../../controller/Authorization';
import verify from '../../helpers/gcashAuthCode';

const authorization: Router = Router();
const controller = new Controller();

authorization.use(verify)
authorization.post('/', controller.getUserInfo);

export default authorization;
