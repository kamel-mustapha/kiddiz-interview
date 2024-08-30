import { Injectable } from '@nestjs/common';
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
}
