import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { database } from '@root/knexfile';
import { fileUpload } from '@root/utils/file-upload.';

export class Category {
  public async create(req: Request, res: Response): Promise<void> {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const { image_url } = files;

    const category = await database(process.env.CATEGORY_TABLE).insert({
      ...req.body,
      image_url: await fileUpload(image_url[0].buffer, 'store')
    });

    res.json({
      status: HTTP_STATUS.CREATED,
      data: category,
      success: true
    });
  }

  public async get(req: Request, res: Response) {
    const { id } = req.query;
    const category = await database(process.env.CATEGORY_TABLE).where({ id });

    res.json({
      status: HTTP_STATUS.OK,
      data: category,
      success: true
    });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.query;
    await Promise.all([
      await database(process.env.CATEGORY_TABLE).where({ id }).delete(),
      await database(process.env.STORE_TABLE).where({ category_id: id }).delete()
    ]);

    res.json({
      status: HTTP_STATUS.NO_CONTENT,
      data: 'Category deleted successfully',
      success: true
    });
  }
}
