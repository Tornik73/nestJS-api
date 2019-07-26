import { Injectable, Inject } from '@nestjs/common';
import { AuthorRepository } from '../repositories/author.repository';
import { Authors } from '../models/index';

@Injectable()
export class AuthorService {
    constructor(private authorsRepository: AuthorRepository) { }

    async findAllAuthors(): Promise<Authors[]>  {
        return await this.authorsRepository.getAllAuthors();
    }
}
