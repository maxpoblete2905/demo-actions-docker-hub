import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Express } from 'express';
import { UploadFileDto } from './upload-file.dto';

@ApiTags('Storage')
@Controller('storage')
export class StorageController {
    constructor(private readonly storageService: StorageService) { }

    @Post('upload')
    @ApiOperation({ summary: 'Upload a file' })
    @ApiResponse({ status: 200, description: 'Returns the URL of the uploaded file' })
    @ApiConsumes('multipart/form-data') // Especifica el tipo de contenido que consume la operación
    @ApiBody({
        description: 'File and original name',
        type: UploadFileDto,
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() uploadFileDto: UploadFileDto
    ): Promise<{ url: string }> {
        const url = await this.storageService.uploadFile(file, uploadFileDto.originalname);
        return { url };
    }
}
