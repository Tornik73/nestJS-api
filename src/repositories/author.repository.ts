import { Injectable, Inject } from '@nestjs/common';
import { Authors } from '../models/index';
import { AUTHORS_REPOSITORY } from '../constants/constants';

@Injectable()
export class AuthorRepository {
    constructor(@Inject(AUTHORS_REPOSITORY)
    private readonly authorRepository: typeof Authors) {
    }

    async getAllAuthors(): Promise<Authors[]> {
        return await this.authorRepository.findAll<Authors>();
    }

    // tslint:disable-next-line:variable-name
    // async getAuthor(_id: number): Promise<Book[]> {
    //     return await this.findById( _id);
    // }

    // async createAuthor(author: Author) {
    //     return await this.insert(author);
    // }

    // // tslint:disable-next-line:variable-name
    // async updateAuthor(_id: number, author: Author) {
    //   return await  this.update(_id, author );
    // }

    // async deleteAuthor(book: Book) {
    //     this.delete(book);
    // }
}
