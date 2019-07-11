import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from './create-book.models';
import { Repository } from 'typeorm';
import { Book } from '../interface/book.interface';
@Injectable()
export class BooksService {

    constructor(@InjectRepository(Books)
    private readonly booksRepository: Repository<Books>) {}

    async findAll(): Promise<Book[]> {
        return await this.booksRepository.find();
    }

    async addBook(book: Book): Promise<any> {
        return await this.booksRepository.insert(book);
    }

    async findOne(id): Promise<Book> {
        return await this.booksRepository.findOne(id);
    }

    async updateBook(id, book: Book): Promise<any> {
        return await this.booksRepository.update(id, book);
    }

    async deleteBook(id): Promise<any> {
        return await this.booksRepository.delete(id);
    }

}
