// firebase-custom-token.guard.ts
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
        console.error('Token de autorización no proporcionado')
        throw new UnauthorizedException('Token de autorización no proporcionado');
      }

      // Validar el token personalizado en tu propio método
      const decodedToken = await this.validateCustomToken(authToken);
      if (!decodedToken) {
        console.error('Token de autorización inválido')
        throw new UnauthorizedException('Token de autorización inválido');
      }

      request.user = decodedToken; // Adjuntar el usuario decodificado a la solicitud

      return true; // Permitir el acceso si la validación del token es exitosa
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error; // Re-lanzar la excepción UnauthorizedException
      } else {
        console.error('Error de autenticación')
        throw new UnauthorizedException('Error de autenticación'); // Capturar y manejar otros errores
      }
    }
  }

  private async validateCustomToken(token: string): Promise<any> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token); // Usa el método adecuado para validar tokens personalizados
      return decodedToken;
    } catch (error) {
      // Puedes manejar errores específicos aquí si lo deseas
      console.error('Error al validar el token:', error);
      return null;
    }
  }
}
