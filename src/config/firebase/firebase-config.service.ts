import { Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

/**
 * @class FirebaseConfigService
 * @description Servicio para inicializar y gestionar las instancias de Firebase en la aplicación NestJS.
 */
@Injectable({ scope: Scope.DEFAULT })
export class FirebaseConfigService {
  public firebaseApp: admin.app.App;
  public firestore: admin.firestore.Firestore;
  public auth: admin.auth.Auth;
  public storage: admin.storage.Storage;
  public messaging: admin.messaging.Messaging;
  public remoteConfig: admin.remoteConfig.RemoteConfig;

  /**
   * @constructor
   * @param {ConfigService} configService - Servicio de configuración de NestJS para obtener variables de entorno.
   */
  constructor(private readonly configService: ConfigService) {
    // Obtener la ruta al archivo de credenciales de servicio y el bucket de almacenamiento de las variables de entorno.
    const serviceAccountPath = this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS');
    const storageBucket = this.configService.get<string>('FIREBASE_STORAGE_BUCKET');

    // Inicializar la aplicación Firebase si no hay ninguna inicializada.
    if (!admin.apps.length) {
      const serviceAccount = require(serviceAccountPath);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket,
      });
    }

    // Asignar la instancia de la aplicación Firebase a la propiedad firebaseApp.
    this.firebaseApp = admin.app();

    // Inicializar los servicios de Firebase y asignarlos a las propiedades correspondientes.
    this.firestore = this.initializeService<admin.firestore.Firestore>(() => this.firebaseApp.firestore());
    this.auth = this.initializeService<admin.auth.Auth>(() => this.firebaseApp.auth());
    this.storage = this.initializeService<admin.storage.Storage>(() => this.firebaseApp.storage());
    this.messaging = this.initializeService<admin.messaging.Messaging>(() => this.firebaseApp.messaging());
    this.remoteConfig = this.initializeService<admin.remoteConfig.RemoteConfig>(() => this.firebaseApp.remoteConfig());
  }

  /**
   * @method initializeService
   * @description Método genérico para inicializar un servicio de Firebase con manejo de errores.
   * @template T
   * @param {T} initializer - Función de inicialización del servicio.
   * @returns {T} - Instancia del servicio de Firebase.
   * @throws {InternalServerErrorException} - Lanza una excepción si la inicialización falla.
   */
  private initializeService<T>(initializer: () => T): T {
    try {
      return initializer();
    } catch (error) {
      console.error(`Error initializing service:`, error);
      throw new InternalServerErrorException('Failed to initialize service');
    }
  }
}
