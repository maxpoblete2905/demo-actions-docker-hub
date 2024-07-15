import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'urldev:4200', 'prod'], // Reemplaza con tu origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite incluir cookies en las solicitudes (si aplica)
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth() // Añade autenticación Bearer si es necesario
    .addTag('users', 'Endpoints relacionados con usuarios') // Tag para usuarios
    .addTag('auth', 'Endpoints relacionados con autenticación') // Tag para autenticación
    .addTag('profile', 'Endpoints relacionados con perfiles de usuario') // Tag para perfiles de usuario
    .addServer('http://localhost:3000', 'Local Development Server') // Añade la URL base de tu API
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
