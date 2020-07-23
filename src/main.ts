import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

     // Global Pipe
  app.useGlobalPipes(new ValidationPipe({
      // disableErrorMessages: true,
     }));
  

 // swagger Api Doc
 const options = new DocumentBuilder()
 .setTitle('API')
 .setDescription('API description')
 .setVersion('1.0')
 .setTermsOfService('TOS')
 .addTag('API')
 .build();
  
  const document = SwaggerModule.createDocument(app, options);
//, { include: [UsersModule], }
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
  console.warn('APP IS LISTENING TO PORT 3000');

}
bootstrap();
