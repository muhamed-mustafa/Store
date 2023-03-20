import { Application } from 'express';
import { storeRoute } from './stores/Routes/store.route';
import { categoryRoute } from './stores/Routes/category.route';
import { config } from './config';

export default (app: Application) => {
  (() => {
    app.use(`${config.BASE_PATH}/store`, storeRoute.routes());
    app.use(`${config.BASE_PATH}/categories`, categoryRoute.routes());
  })();
};
