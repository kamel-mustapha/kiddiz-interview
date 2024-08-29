import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/auth-login.dto';
import { RegisterDto } from '../dto/auth-register.dto';
import { UserService } from 'src/modules/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(body: LoginDto) {}

  async register(body: RegisterDto) {}
}
