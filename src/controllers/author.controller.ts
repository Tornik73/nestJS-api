import { Controller, Get } from '@nestjs/common';
import { AuthorService } from '../services/author.service';

@Controller('authors')
export class AuthorController {
    constructor(private authorService: AuthorService) { }
    @Get()
    getAll() {
        return this.authorService.findAllAuthors();
    }
}
