import { Router } from 'express';
import { Store } from '../Store/store-service';

class StoreRoute {
  private readonly router: Router;

  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    this.router.post('/', Store.prototype.create);

    return this.router;
  }
}

export const storeRoute: StoreRoute = new StoreRoute();
