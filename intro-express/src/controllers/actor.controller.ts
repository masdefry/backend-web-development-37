import { Request, Response } from 'express';
import poolConnection from '../config/pool-connection.config';

export const actorController = {
  async get(req: Request, res: Response) {
    try {
      const { firstName } = req.query;
      const actors = await poolConnection.query(
        `SELECT * FROM actor WHERE first_name = $1`, 
        [firstName]
      );

      res.status(200).json({
        success: true,
        message: 'Get actor successfull',
        data: actors?.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async create(req: Request, res: Response) {
    try {
      // Step-01 Get req data from body
      const { firstName, lastName } = req.body;

      // Step-02 Insert data
      // SQL Injection
      await poolConnection.query(
        `INSERT INTO actor(first_name, last_name) values($1, $2)`, 
        [firstName, lastName]
      );

      res.status(201).json({
        success: true,
        message: 'Create actor successfull',
        data: {
          firstName,
          lastName,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
