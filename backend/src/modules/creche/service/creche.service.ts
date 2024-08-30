import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Creche } from '../creche.entity';
import { Repository } from 'typeorm';
import { CRUDService } from 'src/common/base-crud.service';
import { KidService } from 'src/modules/kid/service/kid.service';

@Injectable()
export class CrecheService extends CRUDService {
  constructor(
    @InjectRepository(Creche) private crecheRepository: Repository<Creche>,
    private kidService: KidService,
  ) {
    super(crecheRepository);
  }

  async findCrecheChildrens(userId: number, id: number) {
    const creche = await this.crecheRepository.findOne({
      where: { id },
      relations: { kids: true },
    });

    if (!creche) throw new NotFoundException();

    if (creche.userId !== userId)
      throw new ForbiddenException('You cannot access to this resource');

    return [...creche.kids];
  }

  async deleteChildFromCreche(
    userId: number,
    crecheId: number,
    childId: number,
  ) {
    // we fetch creche to see if it exists and it's created by the user who made the request
    const creche = await this.crecheRepository.findOne({
      where: { id: crecheId },
      relations: { kids: true },
    });

    if (!creche) throw new NotFoundException();

    if (creche.userId !== userId)
      throw new ForbiddenException('You cannot access to this resource');

    // we fetch child to see if it exists and it's created by the user who made the request
    const child = await this.kidService.findKidById(childId);

    if (!child) throw new NotFoundException();

    if (child.userId !== userId)
      throw new ForbiddenException('You cannot access to this resource');

    // we check if the association kid > creche exist
    if (!creche.kids.map((kid) => kid.id).includes(childId))
      throw new NotFoundException('Association not found');

    // we delete the association
    creche.kids = creche.kids.filter((kid) => kid.id !== childId);

    await this.crecheRepository.save(creche);

    // delete the child if there's no more associations
    if (child.creches.length === 1) await this.kidService.deleteKid(child);

    return creche;
  }
}
