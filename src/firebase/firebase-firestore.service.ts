import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FirebaseConfigService } from './firebase-config.service';
import { DocumentSnapshot } from 'firebase-admin/lib/firestore';
import * as admin from 'firebase-admin';
import { FirebaseException } from './firebase-exception.service';

@Injectable()
export class FirebaseQueryService<T extends FirebaseFirestore.DocumentData> {
  private collectionPath: string;
  private firestoreDb: admin.firestore.Firestore;

  constructor(private firebaseConfigService: FirebaseConfigService) {
    this.firestoreDb = this.firebaseConfigService.firestore;
  }

  setCollectionPath(collectionPath: string) {
    this.collectionPath = collectionPath;
  }

  async createDocument(data: T): Promise<T> {
    try {
      const { id } = await this.firestoreDb.collection(this.collectionPath).add(data);
      return { id, ...data };
    } catch (error) {
      throw new FirebaseException(error);
    }
  }

  async getDocument(documentId: string): Promise<T> {
    try {
      const docRef = await this.firestoreDb.collection(this.collectionPath).doc(documentId).get();
      if (!docRef.exists) {
        throw new NotFoundException('Document not found');
      }
      const response = { id: docRef.id, ...docRef.data() as T };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new FirebaseException(error);
    }
  }

  async updateDocument(documentId: string, data: T): Promise<T> {
    try {
      const docRef = this.firestoreDb.collection(this.collectionPath).doc(documentId);
      const plainData = JSON.parse(JSON.stringify(data)); // Convert to plain object
      await docRef.update(plainData);
      return { ...data, uid: documentId };
    } catch (error) {
      throw new FirebaseException(error);
    }
  }

  async deleteDocument(documentId: string): Promise<boolean> {
    try {
      const docRef = this.firestoreDb.collection(this.collectionPath).doc(documentId);
      await docRef.delete();
      return true;
    } catch (error) {
      throw new FirebaseException(error);
    }
  }

  async getAllDocuments(): Promise<T[]> {
    try {
      const snapshot = await this.firestoreDb.collection(this.collectionPath).get();
      const documents: T[] = [];
      snapshot.forEach((doc: DocumentSnapshot) => {
        documents.push({ id: doc.id, ...doc.data() } as unknown as T);
      });
      return documents;
    } catch (error) {
      throw new FirebaseException(error);
    }
  }
}
