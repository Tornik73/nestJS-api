import { Injectable, Inject } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { Books } from '../models/books/create-book.models';
import { BookRepository } from '../repositories/book.repository';

@Injectable()
export class BooksService {
    constructor(private booksRepository: BookRepository) {}

    async findAll(): Promise<Books[]> {
        return await this.booksRepository.getAll();
    }

    async findOne(id: number): Promise<Books> {
        return await this.booksRepository.getOneById(id);
    }

    async addBook(book: Books): Promise<Books> {
        return await this.booksRepository.addBook(book);
    }

    async updateBook(id: number, book: Books): Promise<object> {
        return await this.booksRepository.updateBook(id, book);
    }

    async deleteBook(id: number) {
        return await this.booksRepository.deleteBook(id);
    }

}
