import { HttpException, HttpStatus } from '@nestjs/common';

export class FirebaseException extends HttpException {
    constructor(error: any) {
        const { code, message } = error;
        let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorMessage = 'Error interacting with Firebase: ' + (message || 'Unknown error in Firebase');

        switch (code) {
            // Firebase Authentication errors
            case 'auth/weak-password':
                httpStatus = HttpStatus.BAD_REQUEST;
                errorMessage = 'The password is too weak. It must be at least 6 characters long.';
                break;
            case 'auth/invalid-phone-number':
                httpStatus = HttpStatus.BAD_REQUEST;
                errorMessage = 'The phone number must be a valid E.164 standard number.';
                break;
            case 'auth/email-already-in-use':
                httpStatus = HttpStatus.CONFLICT;
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'auth/user-not-found':
                httpStatus = HttpStatus.NOT_FOUND;
                errorMessage = 'User not found.';
                break;
            case 'auth/wrong-password':
                httpStatus = HttpStatus.UNAUTHORIZED;
                errorMessage = 'Incorrect password.';
                break;
            case 'auth/network-request-failed':
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
                errorMessage = 'Network request failed. Please check your connection.';
                break;

            // Firestore errors
            case 'permission-denied':
                httpStatus = HttpStatus.FORBIDDEN;
                errorMessage = 'Permission denied to perform operation in Firestore.';
                break;
            case 'aborted':
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
                errorMessage = 'Firestore operation aborted.';
                break;
            case 'deadline-exceeded':
                httpStatus = HttpStatus.REQUEST_TIMEOUT;
                errorMessage = 'Deadline exceeded while performing operation in Firestore.';
                break;
            case 'invalid-argument':
                httpStatus = HttpStatus.BAD_REQUEST;
                errorMessage = 'Invalid argument while performing operation in Firestore.';
                break;
            case 'not-found':
                httpStatus = HttpStatus.NOT_FOUND;
                errorMessage = 'Resource not found in Firestore.';
                break;
            case 'already-exists':
                httpStatus = HttpStatus.CONFLICT;
                errorMessage = 'The resource already exists in Firestore.';
                break;
            case 'unauthenticated':
                httpStatus = HttpStatus.UNAUTHORIZED;
                errorMessage = 'User is not authenticated to perform operation in Firestore.';
                break;
            case 'resource-exhausted':
                httpStatus = HttpStatus.TOO_MANY_REQUESTS;
                errorMessage = 'Resource exhausted while performing operation in Firestore.';
                break;
            case 'cancelled':
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
                errorMessage = 'Firestore operation was cancelled.';
                break;
            case 'data-loss':
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
                errorMessage = 'Data loss occurred while performing operation in Firestore.';
                break;
            case 'unknown':
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
                errorMessage = 'Unknown error occurred while interacting with Firestore.';
                break;
            default:
                console.error(`Firebase error encountered: ${errorMessage}`);
                break;
        }

        super({ statusCode: httpStatus, message: errorMessage }, httpStatus);
    }
}
