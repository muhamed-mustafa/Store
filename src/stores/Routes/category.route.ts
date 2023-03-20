import { Router } from 'express';
import { Category } from '../Store/category-service';
import { createCategoryValidator } from '@root/utils/validators/create-category-validator';
import { upload } from '@root/utils/upload-image';

class CategoryRoute {
  private readonly router: Router;

  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    this.router.post(
      '/',
      upload.fields([{ name: 'image_url', maxCount: 1 }]),
      createCategoryValidator,
      Category.prototype.create
    );
    this.router.get('/', Category.prototype.get);
    this.router.delete('/', Category.prototype.delete);

    return this.router;
  }
}

export const categoryRoute: CategoryRoute = new CategoryRoute();
