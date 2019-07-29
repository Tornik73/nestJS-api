import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { AuthorEntity } from '../models/authors/author.entity';
import { Authors } from '../models';

@Controller('authors')
export class AuthorController {
    constructor(private authorService: AuthorService) { }
    @Get()
    public async getAll(): Promise<AuthorEntity[]> {
        const authors: AuthorEntity[] = await this.authorService.findAllAuthors();
        return authors;
    }

    @Get(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async findOne(@Param('id') id: number): Promise<AuthorEntity> {
        const author: AuthorEntity = await this.authorService.findOne(id);
        return author;
    }

    @Post('')
    public async createAuthor(@Body() author: Authors): Promise<AuthorEntity> {
        const createdAuthor: AuthorEntity = await this.authorService.addAuthor(author);
        return createdAuthor;
    }

    @Put(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async changeBook(@Body() author: Authors, @Param('id') id: number) {
        const updatedAuthor: AuthorEntity = await this.authorService.updateAuthor(id, author);
        return updatedAuthor;
    }

    @Delete(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async deleteAuthor(@Param('id') id: number): Promise<AuthorEntity> {
        const deletedAuthor = await this.authorService.deleteAuthor(id);
        return deletedAuthor;
    }
}
