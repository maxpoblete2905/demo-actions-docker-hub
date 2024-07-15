import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FirebaseConfigService } from './firebase-config.service';
import { DocumentSnapshot } from 'firebase-admin/lib/firestore';
import * as admin from 'firebase-admin';

/**
 * @class FirebaseQueryService
 * @description Servicio genérico para realizar operaciones CRUD en una colección de Firestore.
 * @template T
 */
@Injectable()
export class FirebaseQueryService<T extends FirebaseFirestore.DocumentData> {
  private collectionPath: string;
  private firestore: admin.firestore.Firestore;

  /**
   * @constructor
   * @param {FirebaseConfigService} firebaseConfigService - Servicio de configuración de Firebase que proporciona las instancias de los servicios de Firebase.
   */
  constructor(private firebaseConfigService: FirebaseConfigService) {
    this.firestore = this.firebaseConfigService.firestore;
  }

  /**
   * @method setCollectionPath
   * @description Establece la ruta de la colección en Firestore.
   * @param {string} collectionPath - Ruta de la colección.
   */
  setCollectionPath(collectionPath: string) {
    this.collectionPath = collectionPath;
  }

  /**
   * @method createDocument
   * @description Crea un nuevo documento en la colección especificada de Firestore.
   * @param {T} data - Datos del documento a crear.
   * @returns {Promise<T>} - Documento creado con su ID.
   * @throws {InternalServerErrorException} - Lanza una excepción si la creación falla.
   */
  async createDocument(data: T): Promise<T> {
    try {
      const { id } = await this.firestore.collection(this.collectionPath).add(data);
      return { id, ...data };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create document in Firestore');
    }
  }

  /**
   * @method getDocument
   * @description Obtiene un documento por su ID desde la colección especificada de Firestore.
   * @param {string} documentId - ID del documento.
   * @returns {Promise<T>} - Documento obtenido.
   * @throws {NotFoundException} - Lanza una excepción si el documento no se encuentra.
   * @throws {InternalServerErrorException} - Lanza una excepción si la obtención falla.
   */
  async getDocument(documentId: string): Promise<T> {
    try {
      const docRef = await this.firestore.collection(this.collectionPath).doc(documentId).get();
      if (!docRef.exists) {
        throw new NotFoundException('Document not found');
      }
      const response = { id: docRef.id, ...docRef.data() as T };
      return response;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch document from Firestore');
    }
  }

  /**
   * @method updateDocument
   * @description Actualiza un documento existente en la colección especificada de Firestore.
   * @param {string} documentId - ID del documento.
   * @param {T} data - Datos del documento a actualizar.
   * @returns {Promise<T>} - Documento actualizado con su ID.
   * @throws {InternalServerErrorException} - Lanza una excepción si la actualización falla.
   */
  async updateDocument(documentId: string, data: T): Promise<T> {
    try {
      const docRef = this.firestore.collection(this.collectionPath).doc(documentId);
      const plainData = JSON.parse(JSON.stringify(data)); // Convertir a objeto plano
      await docRef.update(plainData);
      return { ...data, uid: documentId };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update document in Firestore');
    }
  }

  /**
   * @method deleteDocument
   * @description Elimina un documento por su ID desde la colección especificada de Firestore.
   * @param {string} documentId - ID del documento.
   * @returns {Promise<boolean>} - Verdadero si la eliminación fue exitosa.
   * @throws {InternalServerErrorException} - Lanza una excepción si la eliminación falla.
   */
  async deleteDocument(documentId: string): Promise<boolean> {
    try {
      const docRef = this.firestore.collection(this.collectionPath).doc(documentId);
      await docRef.delete();
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete document in Firestore');
    }
  }

  /**
   * @method getAllDocuments
   * @description Obtiene todos los documentos desde la colección especificada de Firestore.
   * @returns {Promise<T[]>} - Lista de documentos obtenidos.
   * @throws {InternalServerErrorException} - Lanza una excepción si la obtención falla.
   */
  async getAllDocuments(): Promise<T[]> {
    try {
      const snapshot = await this.firestore.collection(this.collectionPath).get();
      const documents: T[] = [];
      snapshot.forEach((doc: DocumentSnapshot) => {
        documents.push({ id: doc.id, ...doc.data() } as unknown as T);
      });
      return documents;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch documents from Firestore');
    }
  }
}
