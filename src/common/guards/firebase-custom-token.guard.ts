// src/common/guards/firebase-custom-token.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization?.split(' ')[1]; // Obtener token de autorización del encabezado

    try {
      if (!authToken) {
        throw new UnauthorizedException('Token de autorización no proporcionado');
      }

      const decodedToken = await this.validateCustomToken(authToken);
      if (!decodedToken) {
        throw new UnauthorizedException('Token de autorización inválido');
      }

      request.user = decodedToken; // Adjuntar el usuario decodificado a la solicitud
      return true; // Permitir el acceso si la validación del token es exitosa
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error; // Re-lanzar la excepción UnauthorizedException
      } else {
        throw new UnauthorizedException('Error de autenticación'); // Capturar y manejar otros errores
      }
    }
  }

  private async validateCustomToken(token: string): Promise<any> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token); // Validar el token usando Firebase Admin SDK
      return decodedToken;
    } catch (error) {
      return null;
    }
  }
}
