import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignorar datos que no esten en los DTO
      forbidNonWhitelisted: true, // Lanzar error si existen datos prohibidos
      disableErrorMessages: false, // Desabilitar mensajes de error (producción)
      transformOptions: {
        enableImplicitConversion: true, //tranformar string numero en queryparams
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('SIAFEAPI')
    .setDescription('SIMS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
