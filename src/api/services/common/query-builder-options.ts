import { TransactionType } from '../../../api/entities/Transaction.entity';

export interface SearchQueryOptions {
  uuid?: string;
  transactionType?: TransactionType;
}
