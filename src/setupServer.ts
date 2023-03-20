import express, { Application, Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import { globalError } from '@root/common/middlewares/global-error-middleware';
import appRoutes from '@root/routes';
import { config } from '@root/config';
import HTTP_STATUS from 'http-status-codes';

const SERVER_PORT = config.PORT || 8000;

export class AppServer {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  private corsOptions: cors.CorsOptions = {
    origin: config.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  };

  private rateLimitOptions = {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // Limit each IP to 100 requests per `window` (here, per 1 hour)
    message: 'Too many accounts created from this IP, please try again after an hour'
  };

  public async start(): Promise<void> {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routes(this.app);
    this.globalErrorHandler(this.app);
    await this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(hpp());
    app.use(helmet());
    app.enable('trust proxy');
    app.use(cors(this.corsOptions));
    app.use(rateLimit(this.rateLimitOptions));
    if (config.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
  }

  private standardMiddleware(app: Application): void {
    app.use(express.json({ limit: '50kb' }));
    app.use(compression());
  }

  private routes(app: Application): void {
    appRoutes(app);
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `resource ${req.originalUrl} not found!` });
    });

    app.use(globalError);
  }

  private async startServer(app: Application): Promise<void> {
    try {
      app.listen(SERVER_PORT, () => {
        console.log(`Server listening on port ${SERVER_PORT}`);
      });
    } catch (e) {
      console.log(`Error is: ${e}`);
    }
  }
}
