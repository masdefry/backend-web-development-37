import { Request, Response } from 'express';
import { transactionService } from '../services/transaction.service';

export const transactionController = {
  async create(req: Request, res: Response) {
    const { customerName, paymentMethod, orderItems } = req.body;

    const { ammount, transactionItems } = await transactionService?.create(customerName, paymentMethod, orderItems);
  
    res.status(201).json({
      success: true, 
      message: 'Transaction created successfully', 
      data: {
        customerName, 
        paymentMethod, 
        ammount, 
        transactionItems
      }
    })
  },
};
