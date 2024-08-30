import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kid } from '../kid.entity';
import { Repository } from 'typeorm';
import { CRUDService } from 'src/common/base-crud.service';

@Injectable()
export class KidService extends CRUDService {
  constructor(@InjectRepository(Kid) private kidRepository: Repository<Kid>) {
    super(kidRepository);
  }
}
