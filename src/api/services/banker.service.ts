import { DeepPartial, ObjectLiteral, RemoveOptions } from 'typeorm';
import { Banker } from '../../api/entities/Banker.entity';

export class BankerService {
  async createBanker(input: ObjectLiteral): Promise<Banker> {
    const banker = Banker.create(input);

    await banker.save();
    return banker;
  }

  async getBankerByUuid(uuid: string): Promise<Banker> {
    const banker = await Banker.findOneOrFail({ uuid });

    return banker;
  }

  async getBankers(): Promise<Banker[]> {
    return await Banker.find();
  }

  async updateBanker(
    reference: string,
    fields: DeepPartial<Banker>
  ): Promise<Banker> {
    const banker = await Banker.findOneOrFail({ uuid: reference });

    const updatedBanker = Banker.merge(banker, fields);
    updatedBanker.save();

    return updatedBanker;
  }

  async removeBanker(
    reference: string,
    removeOptions: RemoveOptions
  ): Promise<string> {
    const banker = await Banker.findOneOrFail({ uuid: reference });

    const removedBanker = Banker.remove(banker, removeOptions);
    return (await removedBanker).uuid;
  }
}
