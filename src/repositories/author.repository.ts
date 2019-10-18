import { Injectable, Inject } from '@nestjs/common';
import { Authors } from '../models/index';
import { AUTHORS_REPOSITORY } from '../constants/constants';
import { AuthorModel } from 'src/models/author/author.model';

@Injectable()
export class AuthorRepository {
    constructor(@Inject(AUTHORS_REPOSITORY)
    private readonly authorRepository: typeof Authors) {
    }

    async getAllAuthors(): Promise<Authors[]> {
        return await this.authorRepository.findAll<Authors>();
    }

    // tslint:disable-next-line:variable-name
    async getAuthor(authorID: number): Promise<Authors> {
        return await this.authorRepository.findOne({ where: { id: authorID } });
    }

    async createAuthor(author: Authors): Promise<Authors> {
        return await this.authorRepository.create(author);
    }

    async updateAuthor(authorID: number, author: Authors): Promise<object> {
        return await this.authorRepository.update(
            {
                name: author.name,
                country: author.country,
                birthday: author.birthday,
                deathday: author.deathday,
                authorImg: author.img,
            },
            {
                where: {
                    id: authorID,
                },
            });
    }

    async deleteAuthor(authorID: number): Promise<object> {
        try {
            const author = await this.authorRepository.destroy({
                where: {
                    id: authorID,
                },
            });

            if (!author) {
                return {
                    success: false,
                    message: 'author not found',
                    data: null,
                };
            }
            return {
                success: true,
                message: 'author deleted',
                data: null,
            };
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
                data: null,
            };
        }
    }
}
