import { Request, Response } from 'express';
import { StellarService } from '../services/stellar/stellarService';
import { MobileMoneyService } from '../services/mobilemoney/mobileMoneyService';
import { TransactionModel } from '../models/transaction';

const stellarService = new StellarService();
const mobileMoneyService = new MobileMoneyService();
const transactionModel = new TransactionModel();

export const depositHandler = async (req: Request, res: Response) => {
  try {
    const { amount, phoneNumber, provider, stellarAddress } = req.body;
    
    const transaction = await transactionModel.create({
      type: 'deposit',
      amount,
      phoneNumber,
      provider,
      stellarAddress,
      status: 'pending'
    });

    const mobileMoneyResult = await mobileMoneyService.initiatePayment(
      provider,
      phoneNumber,
      amount
    );

    if (mobileMoneyResult.success) {
      await stellarService.sendPayment(stellarAddress, amount);
      await transactionModel.updateStatus(transaction.id, 'completed');
    }

    res.json({ transactionId: transaction.id, status: 'completed' });
  } catch (error) {
    res.status(500).json({ error: 'Transaction failed' });
  }
};

export const withdrawHandler = async (req: Request, res: Response) => {
  try {
    const { amount, phoneNumber, provider, stellarAddress } = req.body;
    
    const transaction = await transactionModel.create({
      type: 'withdraw',
      amount,
      phoneNumber,
      provider,
      stellarAddress,
      status: 'pending'
    });

    res.json({ transactionId: transaction.id, status: 'pending' });
  } catch (error) {
    res.status(500).json({ error: 'Transaction failed' });
  }
};

export const getTransactionHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await transactionModel.findById(id);
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
};
