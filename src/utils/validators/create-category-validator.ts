import { check } from 'express-validator';
import { validatorMiddleware } from '@root/common/middlewares/validator-middleware';
import { database } from '@root/knexfile';

const createCategoryValidator = [
  check('arabic_name')
    .notEmpty()
    .withMessage('Arabic Name is required')
    .isLength({ min: 3 })
    .withMessage('ArabicName must be at least 3 characters long')
    .custom(async (val) => {
      const category = await database(process.env.CATEGORY_TABLE).where({ arabic_name: val });
      if (category.length) {
        return Promise.reject(new Error('arabic_name is already exists'));
      }

      return true;
    }),

  check('english_name')
    .notEmpty()
    .withMessage('English Name is required')
    .isLength({ min: 3 })
    .withMessage('English Name must be at least 3 characters long')
    .custom(async (val) => {
      console.log(val);

      const category = await database(process.env.CATEGORY_TABLE).where({ english_name: val });
      if (category.length) {
        return Promise.reject(new Error('english_name is already exists'));
      }

      return true;
    }),

  check('view_count').optional().isInt().withMessage('View Count must be Number'),

  validatorMiddleware
];

export { createCategoryValidator };
