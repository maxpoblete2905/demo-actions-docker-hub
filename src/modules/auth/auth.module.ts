import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'src/config/firebase/firebase.module';

@Module({
  imports: [ConfigModule, FirebaseModule], // Asegúrate de importar UserModule
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
