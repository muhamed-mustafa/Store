import { Router } from 'express';
import { Store } from '../Store/store-service';
import { createStoreValidator } from '@root/utils/validators/create-store-validator';

class StoreRoute {
  private readonly router: Router;

  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    this.router.post('/', createStoreValidator, Store.prototype.create);
    this.router.get('/', Store.prototype.getAllStores);

    return this.router;
  }
}

export const storeRoute: StoreRoute = new StoreRoute();
