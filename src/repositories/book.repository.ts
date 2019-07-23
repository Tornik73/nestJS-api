import { Injectable } from '@nestjs/common';
import { Book } from '../models/books/book.model';
import { Books } from '../models/books/create-book.models';
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { BookDocument, BookSchema } from 'src/documents';

@EntityRepository(Books)
export class BookRepository extends Repository<Books> {

    // constructor(
    //     @InjectRepository(Books)
    //     private readonly booksRepository: Repository<Books>,
    // ) { }

    public async getAll(): Promise<Book[]> {
        return await this.find();
    }

    async getOneById(id): Promise<Book> {
        return await this.findOne(id);
    }

    async addBook(book: Book): Promise<any> {
        return await this.insert(book);
    }

    async updateBook(id, book: Book): Promise<any> {
        return await this.update(id, book);
    }

    async deleteBook(id): Promise<any> {
        return await this.delete(id);
    }
}
