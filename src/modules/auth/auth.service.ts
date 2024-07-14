import { Injectable } from '@nestjs/common';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { FirebaseAuthService } from 'src/firebase/firebase-auth.service';
import { AuthOperations } from './interface/auth.interface';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';

@Injectable()
export class AuthService implements AuthOperations {
  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
  ) { }

  recoverPassword(email: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  crearteUserAccessFirebase(userRecord: CreateRequest): Promise<UserRecord> {
    return this.firebaseAuthService.createUser(userRecord);
  }

  checkEmailExistence(email: string): Promise<boolean> {
    return this.firebaseAuthService.checkEmailExistence(email)
  }

}
