import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from '../models/books/create-book.models';
// import { Repository } from 'typeorm';
import { Book } from '../models/books/book.model';
import { BookRepository } from '../repositories/book.repository';

@Injectable()
export class BooksService {

    constructor(@InjectRepository(BookRepository)
    private readonly booksRepository: BookRepository) {}

    async findAll(): Promise<Book[]> {
        return await this.booksRepository.getAll();
    }

    async findOne(id): Promise<Book> {
        return await this.booksRepository.getOneById(id);
        // return await this.booksRepository.findOne(id);
    }

    async addBook(book: Book): Promise<any> {
        return await this.booksRepository.addBook(book);
    }

    async updateBook(id, book: Book): Promise<any> {
        return await this.booksRepository.updateBook(id, book);
    }

    async deleteBook(id): Promise<any> {
        return await this.booksRepository.deleteBook(id);
    }

}
