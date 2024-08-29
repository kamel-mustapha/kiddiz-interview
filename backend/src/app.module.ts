import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BlogModule } from './modules/blog/blog.module';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from 'database.cred';
import { jwtConstants } from 'jwt.cred';
import { JwtModule } from '@nestjs/jwt';

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
          {
            path: 'blog',
            module: BlogModule,
          },
        ],
      },
    ]),
    TypeOrmModule.forRoot(DATABASE),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  providers: [],
})
export class AppModule {}
