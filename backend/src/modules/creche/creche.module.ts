import { Module } from '@nestjs/common';
import { CrecheController } from './controller/creche.controller';
import { CrecheService } from './service/creche.service';
import { UserService } from '../user/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Creche } from './creche.entity';

@Module({
  controllers: [CrecheController],
  providers: [CrecheService, UserService],
  imports: [TypeOrmModule.forFeature([Creche, User])],
})
export class CrecheModule {}
