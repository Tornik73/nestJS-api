import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/book.repository';
import { BookModel, Books } from 'src/models';

@Injectable()
export class BookService {
    constructor(private booksRepository: BookRepository) {}

    public async findAll(): Promise<any[]> {
        return await this.booksRepository.getAll();
    }

    public async findOne(id: number): Promise<Books> {
        return await this.booksRepository.getOneById(id);
    }

    public async addBook(book: Books): Promise<Books> {
        return await this.booksRepository.addBook(book);
    }

    public async updateBook(id: number, book: Books): Promise<BookModel> {
        return await this.booksRepository.updateBook(id, book);
    }

    public async deleteBook(id: number): Promise<object> {
        return await this.booksRepository.deleteBook(id);
    }

}
