import { Module } from '@nestjs/common';
import { KidService } from './service/kid.service';
import { KidController } from './controller/kid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kid } from './kid.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/service/user.service';

@Module({
  providers: [KidService, UserService],
  controllers: [KidController],
  imports: [TypeOrmModule.forFeature([Kid, User])],
})
export class KidModule {}
