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
}
