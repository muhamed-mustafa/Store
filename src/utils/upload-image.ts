import multer from 'multer';
import { ApiError } from '@root/common/errors/api-error';
import { Request } from 'express';

const storage = multer.memoryStorage();

const multerFilter = function (_req: Request, file: any, cb: any) {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ApiError('Only Images allowed', 400), false);
  }
};

const upload = multer({ storage, fileFilter: multerFilter });

export { upload };
