import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Creche } from '../creche.entity';
import { Repository } from 'typeorm';
import { CRUDService } from 'src/common/base-crud.service';

@Injectable()
export class CrecheService extends CRUDService {
  constructor(
    @InjectRepository(Creche) private crecheRepository: Repository<Creche>,
  ) {
    super(crecheRepository);
  }

  async findCrecheChildrens(userId: number, id: number) {
    const entry = await this.crecheRepository.findOne({
      where: { id: id },
      relations: { kids: true },
    });

    if (!entry) throw new NotFoundException();

    if (entry.userId !== userId)
      throw new ForbiddenException('You cannot access to this resource');

    return [...entry.kids];
  }
}
