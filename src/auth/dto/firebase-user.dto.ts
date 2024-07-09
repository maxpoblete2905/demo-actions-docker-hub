import { IsString, IsBoolean, IsOptional, ValidateNested, IsArray, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Metadata {
    @ApiProperty({ example: '2023-01-01T00:00:00Z', description: 'Last sign-in time of the user' })
    @IsOptional()
    @IsDateString()
    lastSignInTime: string | null;

    @ApiProperty({ example: '2023-01-01T00:00:00Z', description: 'Creation time of the user' })
    @IsDateString()
    creationTime: string;

    @ApiProperty({ example: '2023-01-01T00:00:00Z', description: 'Last refresh time of the user' })
    @IsOptional()
    @IsDateString()
    lastRefreshTime: string | null;
}

class ProviderData {
    @ApiProperty({ example: 'some-uid', description: 'UID of the provider' })
    @IsString()
    uid: string;

    @ApiProperty({ example: 'provider-id', description: 'Provider ID' })
    @IsString()
    providerId: string;

    @ApiProperty({ example: 'example@gmail.com', description: 'Email address associated with the provider' })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({ example: '+1234567890', description: 'Phone number associated with the provider' })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({ example: 'https://example.com/photo.jpg', description: 'URL of the profile photo' })
    @IsOptional()
    @IsString()
    photoURL?: string;
}

export class FirebaseUserDto {
    @ApiProperty({ example: 'some-uid', description: 'UID of the user' })
    @IsString()
    uid: string;

    @ApiProperty({ example: 'example@gmail.com', description: 'Email address of the user' })
    @IsString()
    email: string;

    @ApiProperty({ example: true, description: 'Indicates if the email is verified' })
    @IsBoolean()
    emailVerified: boolean;

    @ApiProperty({ example: 'https://example.com/photo.jpg', description: 'URL of the profile photo' })
    @IsOptional()
    @IsString()
    photoURL?: string;

    @ApiProperty({ example: '+1234567890', description: 'Phone number of the user' })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({ example: false, description: 'Indicates if the user account is disabled' })
    @IsBoolean()
    disabled: boolean;

    @ApiProperty({ type: () => Metadata, description: 'Metadata associated with the user' })
    @ValidateNested()
    @Type(() => Metadata)
    metadata: Metadata;

    @ApiProperty({ example: '2023-01-01T00:00:00Z', description: 'Tokens valid after time' })
    @IsDateString()
    tokensValidAfterTime: string;

    @ApiProperty({ type: () => [ProviderData], description: 'Provider data associated with the user' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProviderData)
    providerData: ProviderData[];
}
