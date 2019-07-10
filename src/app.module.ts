import { Module, RequestMethod, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { Users } from './users/create-user.models';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    ItemsModule,
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'bookstore',
        entities : [Users],
        synchronize: true,
      },
    ),
    TypeOrmModule.forFeature([Users]),
    // TypeOrmModule.forFeature([Books]),
    JwtModule.register({
      secretOrPrivateKey: 'secret12356789',
    }),
  ],
  controllers: [
    AppController,
    ItemsController,
    UsersController,
    AuthController,
  ],
  providers: [
    AppService,
    ItemsService,
    UsersService,
    AuthService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.ALL },
        // { path: 'books', method: RequestMethod.ALL },
        { path: 'authenticate', method: RequestMethod.ALL });
        // { path: 'register', method: RequestMethod.ALL })
  }
}
