import { Router } from 'express';
import { depositHandler, withdrawHandler, getTransactionHandler } from '../controllers/transactionController';

export const transactionRoutes = Router();

transactionRoutes.post('/deposit', depositHandler);
transactionRoutes.post('/withdraw', withdrawHandler);
transactionRoutes.get('/:id', getTransactionHandler);
