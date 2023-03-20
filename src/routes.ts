import { Application } from 'express';
import { storeRoute } from './stores/Routes/store.route';
import { config } from './config';
import { createStoreValidator } from './utils/validators/create-store-validator';

export default (app: Application) => {
  (() => {
    app.use(`${config.BASE_PATH}/store`, createStoreValidator, storeRoute.routes());
  })();
};
