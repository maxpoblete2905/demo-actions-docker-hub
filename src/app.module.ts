// AppModule
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { StorageModule } from './modules/storage/storage.module';
import { UsersModule } from './modules/users/user.module';

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