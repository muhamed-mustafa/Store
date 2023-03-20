import { Application } from 'express';
import { storeRoute } from './stores/Routes/store.route';
import { config } from './config';

export default (app: Application) => {
  (() => {
    app.use(`${config.BASE_PATH}/store`, storeRoute.routes());
  })();
};
