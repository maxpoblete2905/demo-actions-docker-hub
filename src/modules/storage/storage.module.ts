import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { FirebaseModule } from '../../config/firebase/firebase.module';

@Module({
    imports: [FirebaseModule],
    controllers: [StorageController],
    providers: [StorageService],
    exports: [StorageService],
})
export class StorageModule { }
