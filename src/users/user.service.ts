import { Injectable } from '@nestjs/common';
import { FirebaseQueryService } from 'src/firebase/firebase-firestore.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './interface/register-user.entity';
import { IUserService } from './interface/user.interface';
import { WorkPlace } from './interface/work-place';

@Injectable()
export class UsersService implements IUserService {
    private readonly collectionPath = 'users';

    constructor(
        private readonly firebaseQueryService: FirebaseQueryService<User>,
    ) {
        this.firebaseQueryService.setCollectionPath(this.collectionPath);
    }

    async create(createUserDto: RegisterUserDto): Promise<User> {
        const { fullName, medicalRegistryNumber, specialties, workPlaces, careTypes } = createUserDto;
        const transformedWorkPlaces: WorkPlace[] = workPlaces.map(wp => ({
            institution: wp.institution,
            position: wp.position,
            currentlyWorking: wp.currentlyWorking,
        }));

        const user: User = {
            fullName,
            medicalRegistryNumber,
            specialties,
            workPlaces: transformedWorkPlaces,
            careTypes,
        };

        return this.firebaseQueryService.createDocument(user);
    }

    findAll(): Promise<User[]> {
        return this.firebaseQueryService.getAllDocuments();
    }

    findOne(id: string): Promise<User> {
        return this.firebaseQueryService.getDocument(id);
    }

    update(uid: string, updateUserDto: RegisterUserDto): Promise<User> {
        const { fullName, medicalRegistryNumber, specialties, workPlaces, careTypes } = updateUserDto;
        const transformedWorkPlaces: WorkPlace[] = workPlaces.map(wp => ({
            institution: wp.institution,
            position: wp.position,
            currentlyWorking: wp.currentlyWorking,
        }));

        const user: User = {
            fullName,
            medicalRegistryNumber,
            specialties,
            workPlaces: transformedWorkPlaces,
            careTypes,
        };

        return this.firebaseQueryService.updateDocument(uid, user);
    }

    remove(uid: string): Promise<boolean> {
        return this.firebaseQueryService.deleteDocument(uid);
    }
}
