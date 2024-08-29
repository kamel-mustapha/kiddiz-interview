import { Module } from '@nestjs/common';
import { KidService } from './service/kid.service';
import { KidController } from './controller/kid.controller';

@Module({
  providers: [KidService],
  controllers: [KidController],
})
export class KidModule {}
