import { Controller, Get, Post, Body, Delete, Put, Param, UseGuards } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { AuthGuard } from '@nestjs/passport';
import { BookModel, Books } from '../models';

@Controller('books')
export class BookController {

    constructor(private bookService: BookService) {}

    @Get()
    public async findAllBooks(): Promise<BookModel[]> {
        const books: BookModel[] = await this.bookService.findAll();
        return books;
    }
    @Get(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async findOneBook(@Param('id') id: number): Promise<BookModel> {
        const book: BookModel = await this.bookService.findOne(id);
        return book;
    }

    @Post('')
    public async createBook(@Body() book: Books): Promise<BookModel> {
        const createdBook: BookModel = await this.bookService.addBook(book);
        return createdBook;
    }

    @Put(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async changeBook(@Body() book: Books, @Param('id') id: number): Promise<BookModel> {
        const updatedBook: BookModel = await this.bookService.updateBook(id, book);
        return updatedBook;
    }

    @Delete(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async deleteBook(@Param('id') id: number): Promise<BookModel> {
        const deletedBook: object = await this.bookService.deleteBook(id);
        return deletedBook;
    }
}
