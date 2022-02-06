import { ObjectLiteral } from 'typeorm';

import { Client } from '../../api/entities/Client.entity';
import {
  Transaction,
  TransactionType,
} from '../../api/entities/Transaction.entity';

class TransactionService {
  async createTransaction(
    clientUuid: string,
    input: ObjectLiteral
  ): Promise<Transaction> {
    const { type, amount } = input;

    const client = await Client.findOneOrFail({ uuid: clientUuid });

    const transaction = Transaction.create({ type, amount, client });
    await transaction.save();

    // alter client's balance
    if (type === TransactionType.DEPOSIT) {
      client.balance = client.balance + amount;
    } else if (type === TransactionType.WITHDRAW) {
      client.balance = client.balance - amount;
    }

    await client.save();

    return transaction;
  }
}

export default new TransactionService();
