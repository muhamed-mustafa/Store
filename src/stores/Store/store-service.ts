import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { database } from '@root/knexfile';

export class Store {
  public async create(req: Request, res: Response): Promise<void> {
    const store = await database(process.env.STORE_TABLE).insert({ ...req.body });

    res.json({
      status: HTTP_STATUS.CREATED,
      data: store,
      success: true
    });
  }

  public async getAllStores(req: Request, res: Response) {
    const { category_id } = req.query;
    const stores = await database(process.env.STORE_TABLE).where({ category_id });

    res.json({
      status: HTTP_STATUS.OK,
      data: stores,
      success: true
    });
  }
}
