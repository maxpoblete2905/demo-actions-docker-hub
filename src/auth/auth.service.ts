import { Injectable } from '@nestjs/common';
import { CreateUserFirebaseDto } from './dto/register-user.dto';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { FirebaseAuthService } from 'src/firebase/firebase-auth.service';
import { AuthOperations } from './interface/auth.interface';

@Injectable()
export class AuthService implements AuthOperations {
  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
  ) { }

  recoverPassword(email: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  crearteUserAccessFirebase(userRecord: CreateUserFirebaseDto): Promise<UserRecord> {
    return this.firebaseAuthService.createUser(userRecord);
  }

  checkEmailExistence(email: string): Promise<boolean> {
    return this.firebaseAuthService.checkEmailExistence(email)
  }


}
