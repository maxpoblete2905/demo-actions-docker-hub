import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseConfigService } from './firebase-config.service';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';

/**
 * @class FirebaseAuthService
 * @description Servicio para gestionar las operaciones de autenticación de Firebase.
 */
@Injectable()
export class FirebaseAuthService {
    private auth: admin.auth.Auth;

    /**
     * @constructor
     * @param {FirebaseConfigService} firebaseConfigService - Servicio de configuración de Firebase que proporciona las instancias de los servicios de Firebase.
     */
    constructor(private readonly firebaseConfigService: FirebaseConfigService) {
        this.auth = this.firebaseConfigService.auth;
    }

    /**
     * @method createUser
     * @description Crea un nuevo usuario en Firebase Authentication.
     * @param {CreateUserFirebaseDto} createUserFirebaseDto - Datos del usuario a crear.
     * @returns {Promise<admin.auth.UserRecord>} - Registro del usuario creado.
     * @throws {InternalServerErrorException} - Lanza una excepción si la creación falla.
     */
    async createUser(createUserFirebaseDto: CreateRequest): Promise<admin.auth.UserRecord> {
        try {
            return await this.auth.createUser(createUserFirebaseDto);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    /**
     * @method getUser
     * @description Obtiene información de un usuario por su UID.
     * @param {string} uid - UID del usuario.
     * @returns {Promise<admin.auth.UserRecord>} - Registro del usuario.
     * @throws {NotFoundException} - Lanza una excepción si el usuario no se encuentra.
     * @throws {InternalServerErrorException} - Lanza una excepción si la obtención falla.
     */
    async getUser(uid: string): Promise<admin.auth.UserRecord> {
        try {
            return await this.auth.getUser(uid);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                throw new NotFoundException('User not found');
            }
            console.error('Error getting user:', error);
            throw new InternalServerErrorException('Failed to get user');
        }
    }

    /**
     * @method checkEmailExistence
     * @description Verifica si un correo electrónico ya está en uso.
     * @param {string} email - Correo electrónico a verificar.
     * @returns {Promise<boolean>} - Verdadero si el correo electrónico ya está en uso.
     * @throws {InternalServerErrorException} - Lanza una excepción si la verificación falla.
     */
    async checkEmailExistence(email: string): Promise<boolean> {
        try {
            await this.auth.getUserByEmail(email);
            return true;
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                return false;
            }
            console.error('Error checking email existence:', error);
            throw new InternalServerErrorException('Failed to check email existence');
        }
    }

    /**
     * @method updateUser
     * @description Actualiza la información de un usuario.
     * @param {string} uid - UID del usuario.
     * @param {object} updatedInfo - Información actualizada del usuario.
     * @param {string} [updatedInfo.displayName] - Nuevo nombre de usuario.
     * @param {string} [updatedInfo.photoURL] - Nueva URL de la foto del usuario.
     * @returns {Promise<admin.auth.UserRecord>} - Registro del usuario actualizado.
     * @throws {InternalServerErrorException} - Lanza una excepción si la actualización falla.
     */
    async updateUser(uid: string, updatedInfo: { displayName?: string; photoURL?: string }): Promise<admin.auth.UserRecord> {
        try {
            return await this.auth.updateUser(uid, updatedInfo);
        } catch (error) {
            console.error('Error updating user:', error);
            throw new InternalServerErrorException('Failed to update user');
        }
    }

    /**
     * @method deleteUser
     * @description Elimina un usuario por su UID.
     * @param {string} uid - UID del usuario.
     * @returns {Promise<void>} - Resolución de la promesa al eliminar el usuario.
     * @throws {InternalServerErrorException} - Lanza una excepción si la eliminación falla.
     */
    async deleteUser(uid: string): Promise<void> {
        try {
            await this.auth.deleteUser(uid);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new InternalServerErrorException('Failed to delete user');
        }
    }

    /**
     * @method verifyIdToken
     * @description Verifica si un token de usuario es válido.
     * @param {string} idToken - Token de usuario a verificar.
     * @returns {Promise<admin.auth.DecodedIdToken>} - Token decodificado si es válido.
     * @throws {InternalServerErrorException} - Lanza una excepción si la verificación falla.
     */
    async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
        try {
            return await this.auth.verifyIdToken(idToken);
        } catch (error) {
            console.error('Error verifying ID token:', error);
            throw new InternalServerErrorException('Failed to verify ID token');
        }
    }
}
