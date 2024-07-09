// FirebaseModule
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseConfigService } from './firebase-config.service';
import { FirebaseQueryService } from './firebase-firestore.service';
import { FirebaseStorageService } from './firebase-storage.service';
import { FirebaseException } from './firebase-exception.service';

@Module({
  imports: [ConfigModule],
  providers: [
    FirebaseConfigService,
    FirebaseQueryService,
    FirebaseStorageService,
    FirebaseException
  ],
  exports: [
    FirebaseConfigService,
    FirebaseQueryService,
    FirebaseStorageService,
    FirebaseException
  ],
})
export class FirebaseModule { }