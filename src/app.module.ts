import { Module, RequestMethod, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthorController, BookController, UserController, AuthController } from './controllers';
import { AuthService, AuthorService, UserService, BookService } from './services';
import { AuthorRepository, BookRepository, UserRepository, AuthRepository } from './repositories/';
import { userProviders, bookProviders, authorProviders, authorBookProviders } from './models/';
import { DatabaseModule } from './database/database.module';
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
  controllers: [AuthorController, BookController, UserController, AuthController],
  providers: [
    HttpStrategy,
    AuthorService,
    BookService,
    UserService,
    AuthService,
    BookRepository,
    AuthorRepository,
    UserRepository,
    AuthRepository,
    ...bookProviders,
    ...authorBookProviders,
    ...authorProviders,
    ...userProviders,
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
