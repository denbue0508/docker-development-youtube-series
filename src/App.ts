import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { v1 } from './routes/index';
import * as errorHandler from './helpers/errorHandler';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
    this.setHealthChecker();
  }

  private setHealthChecker(): void {
    this.express.use('/health-check', (req, res) => res.status(200).send('PARCELS-IO OK!'));
  }

  private setRoutes(): void {
    this.express.use('/v1', v1);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}

export default new App().express;