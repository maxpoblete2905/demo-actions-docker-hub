// FirebaseModule
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseConfigService } from './firebase-config.service';
import { FirebaseQueryService } from './firebase-firestore.service';
import { FirebaseStorageService } from './firebase-storage.service';
import { FirebaseAuthService } from './firebase-auth.service';

@Module({
  imports: [ConfigModule],
  providers: [
    FirebaseConfigService,
    FirebaseQueryService,
    FirebaseStorageService,
    FirebaseAuthService
  ],
  exports: [
    FirebaseConfigService,
    FirebaseQueryService,
    FirebaseStorageService,
    FirebaseAuthService
  ],
})
export class FirebaseModule { }