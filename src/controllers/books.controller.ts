import { Controller, Get, Post, Body, Delete, Put, Param, UseGuards } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Book } from '../models/books/book.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService) {}

    @Get()
    findAll() {
        return this.bookService.findAll();
    }
    @Get(':id')
    // @UseGuards(AuthGuard('bearer'))
    findOne(@Param('id') id) {
        return this.bookService.findOne(id);
    }

    @Post('')
    createBook(@Body() book: Book) {
        return this.bookService.addBook(book);
    }

    @Put(':id')
    // @UseGuards(AuthGuard('bearer'))
    changeUser(@Body() book: Book, @Param('id') id) {
        return this.bookService.updateBook(id, book);
    }

    @Delete(':id')
    // @UseGuards(AuthGuard('bearer'))
    delUser(@Param('id') id) {
        return this.bookService.deleteBook(id);
    }
}
