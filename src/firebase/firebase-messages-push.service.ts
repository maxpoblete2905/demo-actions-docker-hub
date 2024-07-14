import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseConfigService } from './firebase-config.service';

/**
 * @class FirebaseMessagingService
 * @description Servicio para gestionar las operaciones de mensajería de Firebase.
 */
@Injectable()
export class FirebaseMessagingService {
    private messaging: admin.messaging.Messaging;

    /**
     * @constructor
     * @param {FirebaseConfigService} firebaseConfigService - Servicio de configuración de Firebase que proporciona las instancias de los servicios de Firebase.
     */
    constructor(private readonly firebaseConfigService: FirebaseConfigService) {
        this.messaging = this.firebaseConfigService.messaging;
    }

    /**
     * @method sendNotification
     * @description Envía una notificación a un solo dispositivo.
     * @param {string} token - Token del dispositivo al que se enviará la notificación.
     * @param {string} title - Título de la notificación.
     * @param {string} body - Cuerpo de la notificación.
     * @param {any} [data] - Datos adicionales opcionales que se enviarán con la notificación.
     * @returns {Promise<string>} - ID del mensaje enviado.
     * @throws {InternalServerErrorException} - Lanza una excepción si el envío de la notificación falla.
     */
    async sendNotification(token: string, title: string, body: string, data?: any): Promise<string> {
        const message: admin.messaging.Message = {
            token,
            notification: {
                title,
                body,
            },
            data: data || {},
        };

        try {
            const response = await this.messaging.send(message);
            console.log('Successfully sent message:', response);
            return response;
        } catch (error) {
            console.error('Error sending message:', error);
            throw new InternalServerErrorException('Failed to send notification');
        }
    }

    /**
     * @method sendMulticastNotification
     * @description Envía una notificación a múltiples dispositivos.
     * @param {string[]} tokens - Lista de tokens de los dispositivos a los que se enviará la notificación.
     * @param {string} title - Título de la notificación.
     * @param {string} body - Cuerpo de la notificación.
     * @param {any} [data] - Datos adicionales opcionales que se enviarán con la notificación.
     * @returns {Promise<string[]>} - Lista de IDs de los mensajes enviados.
     * @throws {InternalServerErrorException} - Lanza una excepción si el envío de las notificaciones falla.
     */
    async sendMulticastNotification(tokens: string[], title: string, body: string, data?: any): Promise<string[]> {
        const messages: admin.messaging.Message[] = tokens.map(token => ({
            token,
            notification: {
                title,
                body,
            },
            data: data || {},
        }));

        const responses: string[] = [];

        try {
            for (const message of messages) {
                const response = await this.messaging.send(message);
                responses.push(response);
                console.log('Successfully sent message:', response);
            }
            return responses;
        } catch (error) {
            console.error('Error sending multicast message:', error);
            throw new InternalServerErrorException('Failed to send multicast notification');
        }
    }
}
