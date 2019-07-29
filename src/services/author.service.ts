import { Injectable, Inject } from '@nestjs/common';
import { AuthorRepository } from '../repositories/author.repository';
import { Authors } from '../models/index';

@Injectable()
export class AuthorService {
    constructor(private authorsRepository: AuthorRepository) { }

    async findAllAuthors(): Promise<Authors[]>  {
        return await this.authorsRepository.getAllAuthors();
    }

    async findOne(id: number): Promise<Authors> {
        return await this.authorsRepository.getAuthor(id);
    }

    async addAuthor(author: Authors): Promise<Authors> {
        return await this.authorsRepository.createAuthor(author);
    }

    async updateAuthor(id: number, book: Authors): Promise<object> {
        return await this.authorsRepository.updateAuthor(id, book);
    }

    async deleteAuthor(id: number) {
        return await this.authorsRepository.deleteAuthor(id);
    }
}
