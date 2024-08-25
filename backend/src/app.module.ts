import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BlogModule } from './modules/blog/blog.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BlogModule,
    RouterModule.register([
      {
        path: 'api/v1/',
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
