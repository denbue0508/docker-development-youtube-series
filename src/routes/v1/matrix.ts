import { Router } from 'express';
import Controller from '../../controller/Heatmap';

const matrix: Router = Router();
const controller = new Controller();

matrix.post('/', controller.create);

matrix.get('/', controller.get);

export default matrix;
