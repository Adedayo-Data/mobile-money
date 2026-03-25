import { Router } from "express";
import { VersionedRequest } from "../../middleware/apiVersion";
import {
  depositHandler,
  withdrawHandler,
  getTransactionHandler,
  updateNotesHandler,
  searchTransactionsHandler,
} from "../../controllers/transactionController";
import { TimeoutPresets, haltOnTimedout } from "../../middleware/timeout";

export const transactionRoutesV1 = Router();

// Deposit transaction route
transactionRoutesV1.post(
  "/deposit",
  TimeoutPresets.long,
  haltOnTimedout,
  (req: VersionedRequest, res, next) => {
    // Add API version to request for handler
    req.apiVersion = "v1";
    next();
  },
  depositHandler
);

// Withdraw transaction route
transactionRoutesV1.post(
  "/withdraw",
  TimeoutPresets.long,
  haltOnTimedout,
  (req: VersionedRequest, res, next) => {
    req.apiVersion = "v1";
    next();
  },
  withdrawHandler
);

// Get specific transaction
transactionRoutesV1.get(
  "/:id",
  TimeoutPresets.quick,
  haltOnTimedout,
  (req: VersionedRequest, res, next) => {
    req.apiVersion = "v1";
    next();
  },
  getTransactionHandler
);

// Update transaction notes
transactionRoutesV1.patch(
  "/:id/notes",
  TimeoutPresets.quick,
  haltOnTimedout,
  (req: VersionedRequest, res, next) => {
    req.apiVersion = "v1";
    next();
  },
  updateNotesHandler
);

// Search transactions
transactionRoutesV1.get(
  "/search",
  TimeoutPresets.quick,
  haltOnTimedout,
  (req: VersionedRequest, res, next) => {
    req.apiVersion = "v1";
    next();
  },
  searchTransactionsHandler
);
