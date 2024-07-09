import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseConfigService } from './firebase-config.service';
import { CreateUserFirebaseDto } from 'src/auth/dto/register-user.dto';

@Injectable()
export class FirebaseAuthService {
    private auth: admin.auth.Auth;

    constructor(private readonly firebaseConfigService: FirebaseConfigService) {
        this.auth = this.firebaseConfigService.auth;
    }

    // Crear un nuevo usuario
    async createUser(createUserFirebaseDto: CreateUserFirebaseDto): Promise<admin.auth.UserRecord> {
        return await this.auth.createUser(createUserFirebaseDto);
    }

    // Obtener información de un usuario por UID
    async getUser(uid: string): Promise<admin.auth.UserRecord> {
        return await this.auth.getUser(uid);
    }

    // Verificar si un correo electrónico ya está en uso
    async checkEmailExistence(email: string): Promise<boolean> {
        await this.auth.getUserByEmail(email);
        return true
    }

    // Actualizar información de un usuario
    async updateUser(uid: string, updatedInfo: { displayName?: string; photoURL?: string }): Promise<admin.auth.UserRecord> {
        return await this.auth.updateUser(uid, updatedInfo);
    }

    // Eliminar un usuario
    async deleteUser(uid: string): Promise<void> {
        await this.auth.deleteUser(uid);
    }

    // Verificar si un token de usuario es válido
    async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
        return await this.auth.verifyIdToken(idToken);
    }

}
