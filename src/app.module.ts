// AppModule
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/user.module';

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
  providers: [],
  controllers: [],
})
export class AppModule { }