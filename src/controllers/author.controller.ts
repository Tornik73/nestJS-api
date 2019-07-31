import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { AuthorModel } from '../models/author/author.model';
import { Authors } from '../models';

@Controller('authors')
export class AuthorController {
    constructor(private authorService: AuthorService) { }
    @Get()
    public async getAllAuthors(): Promise<AuthorModel[]> {
        const authors: AuthorModel[] = await this.authorService.findAllAuthors();
        return authors;
    }

    @Get(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async findOneAuthor(@Param('id') id: number): Promise<AuthorModel> {
        const author: AuthorModel = await this.authorService.findOne(id);
        return author;
    }

    @Post('')
    public async createAuthor(@Body() author: Authors): Promise<AuthorModel> {
        const createdAuthor: AuthorModel = await this.authorService.addAuthor(author);
        return createdAuthor;
    }

    @Put(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async changeAuthor(@Body() author: Authors, @Param('id') id: number): Promise<AuthorModel> {
        const updatedAuthor: AuthorModel = await this.authorService.updateAuthor(id, author);
        return updatedAuthor;
    }

    @Delete(':id')
    // @UseGuards(AuthGuard('bearer'))
    public async deleteAuthor(@Param('id') id: number): Promise<AuthorModel> {
        const deletedAuthor: object = await this.authorService.deleteAuthor(id);
        return deletedAuthor;
    }
}
