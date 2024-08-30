import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from 'database.cred';
import { jwtConstants } from 'jwt.cred';
import { JwtModule } from '@nestjs/jwt';
import { CrecheModule } from './modules/creche/creche.module';
import { KidModule } from './modules/kid/kid.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CrecheModule,
    KidModule,
    RouterModule.register([
      {
        path: 'api/v1/',
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'user',
            module: UserModule,
          },
          {
            path: 'child-cares',
            module: CrecheModule,
          },
          {
            path: 'child',
            module: KidModule,
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
})
export class AppModule {}
