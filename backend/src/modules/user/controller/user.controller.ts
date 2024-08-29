import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @HttpCode(200)
  @Get()
  async findOne(@Query('username') username: string) {
    if (!username)
      throw new BadRequestException('You need to provide an username');
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('No user with this username found');
    return user;
  }

  @HttpCode(200)
  @Put()
  async updateUser(@Body() body: UpdateUserDto) {
    const user = await this.userService.findByUsername(body.username);
    if (!user) throw new NotFoundException('No user with this username found');
    const updatedUser = await this.userService.updateEmail(user, body.email);
    return updatedUser;
  }
}
