import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Readable } from 'stream';
import { FirebaseConfigService } from './firebase-config.service';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseStorageService {
    private storage: admin.storage.Storage;

    constructor(private firebaseConfigService: FirebaseConfigService) {
        this.storage = this.firebaseConfigService.storage;
    }

    async uploadFileAsStream(file: Express.Multer.File, destination: string): Promise<string> {
        try {
            const bucket = this.storage.bucket();

            // Crear un stream de lectura a partir del buffer del archivo
            const fileStream = new Readable();
            fileStream.push(file.buffer);
            fileStream.push(null); // Fin del stream

            // Obtener referencia al archivo en Firebase Storage
            const fileRef = bucket.file(destination);

            // Crear un stream de escritura en el archivo de destino
            const uploadStream = fileRef.createWriteStream({
                resumable: false, // Desactivar la resumibilidad para streams pequeños
                contentType: file.mimetype,
                // Puedes añadir más opciones aquí, como metadata
            });

            // Manejar eventos del stream de escritura
            fileStream.pipe(uploadStream);

            // Retornar una promesa que resuelva cuando la carga del archivo esté completa
            return new Promise((resolve, reject) => {
                uploadStream.on('error', (error) => {
                    console.error('Error uploading file to Firebase Storage:', error);
                    reject(new InternalServerErrorException('Failed to upload file to Firebase Storage'));
                });

                uploadStream.on('finish', async () => {
                    // Obtener la URL del archivo subido
                    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
                    resolve(fileUrl);
                });
            });
        } catch (error) {
            console.error('Error uploading file to Firebase Storage:', error);
            throw new InternalServerErrorException('Failed to upload file to Firebase Storage');
        }
    }
}
