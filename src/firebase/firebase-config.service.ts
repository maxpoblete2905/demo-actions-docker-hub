import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseConfigService {
  public firebaseApp: admin.app.App;
  public firestore: admin.firestore.Firestore;
  public auth: admin.auth.Auth;
  public storage: admin.storage.Storage;

  constructor(private readonly configService: ConfigService) {
    const serviceAccountPath = this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS');
    const storageBucket = this.configService.get<string>('FIREBASE_STORAGE_BUCKET');

    if (!admin.apps.length) {
      const serviceAccount = require(serviceAccountPath);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket,
      });
    }
    this.firebaseApp = admin.app();

    this.firestore = this.initializeService<admin.firestore.Firestore>(() => this.firebaseApp.firestore());
    this.auth = this.initializeService<admin.auth.Auth>(() => this.firebaseApp.auth());
    this.storage = this.initializeService<admin.storage.Storage>(() => this.firebaseApp.storage());
  }

  private initializeService<T>(initializer: () => T): T {
    try {
      return initializer();
    } catch (error) {
      console.error(`Error initializing service:`, error);
      throw new InternalServerErrorException('Failed to initialize service');
    }
  }
}
