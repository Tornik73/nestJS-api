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
@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AuthorController, BooksController, UsersController],
  providers: [
    AuthorService,
    BooksService,
    UsersService,

    BookRepository,
    AuthorRepository,
    UserRepository,

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
        { path: 'authenticate', method: RequestMethod.ALL });
  }
}
