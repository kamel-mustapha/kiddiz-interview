import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kid } from '../kid.entity';
import { Repository } from 'typeorm';
import { CRUDService } from 'src/common/base-crud.service';

@Injectable()
export class KidService extends CRUDService {
  constructor(@InjectRepository(Kid) private kidRepository: Repository<Kid>) {
    super(kidRepository);
  }

  async findKidById(id: number) {
    const entry = await this.kidRepository.findOneBy({ id: id });
    return entry;
  }

  async deleteKid(kid: Kid) {
    return this.kidRepository.remove(kid);
  }
}
