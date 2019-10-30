import { Module, RequestMethod, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthorController, BookController, UserController, AuthController, ChatController } from './controllers';
import { AuthService, AuthorService, UserService, BookService, ChatService } from './services';
import { AuthorRepository, BookRepository, UserRepository, AuthRepository, ChatRepository } from './repositories/';
import { userProviders, bookProviders, authorProviders, authorBookProviders, chatProviders } from './models/';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { HttpStrategy } from './common/http.strategy';
import { StripeModule } from 'nestjs-stripe';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [
    JwtModule.register({
      secret: '123456789',
      // signOptions: { expiresIn: environment().tokenExpireTime },
    }),
    StripeModule.forRoot({
      apiKey: 'pk_test_uwjRZA128Nvmq3111lJLJxhs00rQ8H9M7T',
    }),
    DatabaseModule,
  ],
  controllers: [AuthorController, BookController, UserController, AuthController, ChatController],
  providers: [
    ChatGateway,
    HttpStrategy,
    AuthorService,
    BookService,
    UserService,
    AuthService,
    ChatService,
    BookRepository,
    AuthorRepository,
    UserRepository,
    AuthRepository,
    ChatRepository,
    ...chatProviders,
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
        { path: 'chat', method: RequestMethod.ALL },
        { path: 'register', method: RequestMethod.ALL });
  }
}
