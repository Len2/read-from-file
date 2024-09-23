import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nestjs Node v21 Starter')
      .setDescription('Nestjs Node v21 Starter API Documentation')
      .setVersion('1.0')
      .addTag('Node v21')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  await app.listen(port);
}
bootstrap()
  .then(() => {
    console.log(
      `🚀 Server started at http://localhost:${port}\n🚨️ Environment: ${process.env.NODE_ENV}`,
    );
  })
  .catch(() => {
    console.log(`Server could not be started at http://localhost:${port}`);
  });
