import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('src/secrets/server.key'),
    cert: fs.readFileSync('src/secrets/server.cert'),
  };
  const app = await NestFactory.create(AppModule, {cors: true});
  // const app = await NestFactory.create(AppModule, {httpsOptions});
  app.enableCors();
  await app.listen(4011);
}
bootstrap();
