import { Module } from '@nestjs/common';
import { CrecheController } from './controller/creche.controller';
import { CrecheService } from './service/creche.service';

@Module({
  controllers: [CrecheController],
  providers: [CrecheService],
})
export class CrecheModule {}
