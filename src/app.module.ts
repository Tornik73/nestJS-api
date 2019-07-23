import { Module, RequestMethod, MiddlewareConsumer, NestModule } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './models/users/create-user.models';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
// import { LoggerMiddleware } from './logger.middleware';
import { BooksController } from './controllers/books.controller';
import { Books } from './models/books/create-book.models';
import { BooksService } from './services/books.service';
import { HttpStrategy } from './common/http.strategy';
import { BookRepository } from './repositories/book.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'bookstore',
        entities : [Users, Books],
        synchronize: true,
      },
    ),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Books]),
    TypeOrmModule.forFeature([BookRepository]),
    JwtModule.register({
      secret: 'secret12356789',
    }),
  ],
  controllers: [
    UsersController,
    AuthController,
    BooksController,
  ],
  providers: [
    AppService,
    UsersService,
    BooksService,
    AuthService,
    HttpStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: 'users', method: RequestMethod.ALL },
        { path: 'books', method: RequestMethod.ALL },
        { path: 'authenticate', method: RequestMethod.ALL });
  }
}
