// src/auth/infrastructure/firebase/firebase.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
    private readonly firebaseApp: admin.app.App;

    constructor() {
        this.firebaseApp = admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        });
    }

    get auth() {
        return this.firebaseApp.auth();
    }
}
