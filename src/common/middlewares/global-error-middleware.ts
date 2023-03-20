import { Request, Response, NextFunction } from 'express';
import { Error } from '@root/common/interfaces/error-interface';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
  }
};

const sendErrorForDev = (err: Error, res: Response) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });

export { globalError };
