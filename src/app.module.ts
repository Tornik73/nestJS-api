import { Module, RequestMethod, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthorService } from './services/author.service';
import { authorsProviders } from './models/authors/authors.providers';
import { AuthorRepository } from './repositories/author.repository';
import { BooksService } from './services/books.service';
import { BookRepository } from './repositories/book.repository';
import { booksProviders } from './models/books/books.providers';
import { BooksController, UsersController } from './controllers';
import { AuthorController } from './controllers/author.controller';
import { authorBookProviders } from './models/authorsBooks/authorsBooks.providers';
import { DatabaseModule } from './database/database.module';
import { usersProviders } from './models/users/users.providers';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repositories/auth.repository';
import { environment } from './environment';
import { JwtModule } from '@nestjs/jwt';
import { HttpStrategy } from './common/http.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: '123456789',
      // signOptions: { expiresIn: environment().tokenExpireTime },
    }),
    DatabaseModule,
  ],
  controllers: [AuthorController, BooksController, UsersController, AuthController],
  providers: [
    HttpStrategy,
    AuthorService,
    BooksService,
    UsersService,
    AuthService,
    BookRepository,
    AuthorRepository,
    UserRepository,
    AuthRepository,
    ...booksProviders,
    ...authorBookProviders,
    ...authorsProviders,
    ...usersProviders,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: 'users', method: RequestMethod.ALL },
        { path: 'books', method: RequestMethod.ALL },
        { path: 'authors', method: RequestMethod.ALL },
        { path: 'authenticate', method: RequestMethod.ALL },
        { path: 'register', method: RequestMethod.ALL });
  }
}
