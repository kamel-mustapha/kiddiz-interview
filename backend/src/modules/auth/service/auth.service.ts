import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/auth-login.dto';
import { RegisterDto } from '../dto/auth-register.dto';
import { User } from 'src/modules/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  saltOrRounds: number = 10;

  async login(body: LoginDto) {
    const user = await this.usersRepository.findOneBy({ email: body.email });
    if (!user) return;
    const isMatch = await bcrypt.compare(body.password, user?.password);
    if (!isMatch) return;
    return user;
  }

  async register(body: RegisterDto) {
    const user = new User();
    user.email = body.email;
    const hashPass = await bcrypt.hash(body.password, this.saltOrRounds);
    user.password = hashPass;
    const createdUser = await this.usersRepository.save(user);
    return createdUser;
  }
}
