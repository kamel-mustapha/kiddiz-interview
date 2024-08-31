import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kid } from '../kid.entity';
import { Repository } from 'typeorm';
import { CRUDService } from 'src/common/base-crud.service';
import { Readable } from 'stream';
import { format } from 'fast-csv';

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

  async exportChildren(userId: number, crecheId: number, response: any) {
    // Create a query builder
    let query = this.kidRepository
      .createQueryBuilder('kid')
      .leftJoinAndSelect('kid.creches', 'childCare')
      .select(['kid.firstName', 'kid.lastName', 'childCare.name'])
      .where('kid.userId = :userId', { userId });
    // filter by creche
    if (crecheId) {
      query = query.andWhere('childCare.id = :crecheId', { crecheId });
    }

    // remove duplicates and order by
    query = query.distinct().orderBy('kid.lastName', 'ASC');

    const stream = await query.stream();

    const csvStream = format({ headers: true }).transform((row: any) => ({
      Prénom: row.kid_first_name,
      Nom: row.kid_last_name,
    }));

    // Pipe the query stream to CSV formatting stream, and then to the response
    Readable.from(stream)
      .pipe(csvStream)
      .pipe(response)
      .on('end', () => {
        response.end(); // Ensure the response is ended
      })
      .on('error', (err) => {
        console.error('Streaming error:', err);
        response.status(500).end(); // Handle errors
      });
  }
}
