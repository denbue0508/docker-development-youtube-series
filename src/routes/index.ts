import { Router } from 'express';
import matrix from './v1/matrix';
import device from './v1/device';
import verifyToken from '../helpers/verifyToken';

export const v1: Router = Router();

/* MIDDLEWARE FOR AUTHENTICATION */
v1.use(verifyToken);

v1.use('/heatmap', matrix);
v1.use('/device', device);