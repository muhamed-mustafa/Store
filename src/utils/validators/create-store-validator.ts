import { check } from 'express-validator';
import { validatorMiddleware } from '@root/common/middlewares/validator-middleware';
import { database } from '@root/knexfile';

const createStoreValidator = [
  check('arabic_name')
    .notEmpty()
    .withMessage('Arabic Name is required')
    .isLength({ min: 3 })
    .withMessage('ArabicName must be at least 3 characters long'),

  check('english_name')
    .notEmpty()
    .withMessage('English Name is required')
    .isLength({ min: 3 })
    .withMessage('English Name must be at least 3 characters long'),

  check('contact_person_name')
    .notEmpty()
    .withMessage('Contact Person Name is required')
    .isLength({ min: 3 })
    .withMessage('Contact Person Name must be at least 3 characters long'),

  check('contact_person_Number').optional().isInt().withMessage('Invalid Number'),

  check('fb_store_url').optional().isURL().withMessage('Fb_Store_Url must be as url'),

  check('insta_store_url').optional().isURL().withMessage('Insta_Store_Url must be as url'),

  check('category_id')
    .notEmpty()
    .withMessage('Category Id is required')
    .isInt()
    .withMessage('Invalid Category Id')
    .custom(async (val) => {
      console.log(val);

      const category = await database('categories').where({ id: val });
      if (!category) {
        return Promise.reject(new Error('Category Not Found'));
      }
    }),

  validatorMiddleware
];

export { createStoreValidator };
