import { Injectable } from '@nestjs/common';
import { FirebaseStorageService } from 'src/firebase/firebase-storage.service';

@Injectable()
export class StorageService {
    constructor(private readonly firebaseStorageService: FirebaseStorageService) { }
    async uploadFile(fileBuffer: Express.Multer.File, filePath: string): Promise<string> {
        const bucket = this.firebaseStorageService.uploadFileAsStream(fileBuffer, filePath);
        return bucket;
    }
}
