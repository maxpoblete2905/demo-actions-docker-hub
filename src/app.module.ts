// AppModule
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { FirebaseModule } from './config/firebase/firebase.module';
import { StorageModule } from './modules/storage/storage.module';
import { UsersModule } from './modules/users/user.module';
import { APP_FILTER } from '@nestjs/core';
import { UserExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
      expandVariables: true,
      //cache: true,
    }),
    AuthModule,
    FirebaseModule,
    StorageModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: UserExceptionFilter,
    },
  ],
  controllers: [],
})
export class AppModule { }