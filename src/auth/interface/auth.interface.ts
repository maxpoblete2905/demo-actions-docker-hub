import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { CreateUserFirebaseDto } from "../dto/register-user.dto";

export interface AuthOperations {

    crearteUserAccessFirebase(userRecord: CreateUserFirebaseDto): Promise<UserRecord>

    recoverPassword(email: string): Promise<any>;

    checkEmailExistence(email: string): Promise<boolean>;
}
