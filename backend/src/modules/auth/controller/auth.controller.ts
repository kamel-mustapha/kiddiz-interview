import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dto/auth-login.dto';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginDto) {
    // const user = await this.authService.login(body);
    // if (!user) throw new UnauthorizedException('Wrong credentials');
    // const payload = { sub: user.id, username: user.email };
    // return { status: 200, access_token: this.jwtService.sign(payload) };
  }

  @HttpCode(201)
  @Post('register')
  async register(@Body() body: RegisterDto) {
    // const user = await this.authService.register(body).catch((e) => {
    //   throw new ConflictException('User already exist');
    // });
    // if (!user) throw new BadRequestException('Bad request');
    // return { status: 200 };
  }
}
