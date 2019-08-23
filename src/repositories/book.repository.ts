import { AuthorsBooks, Books, Authors } from '../models/';
import { Inject, Injectable } from '@nestjs/common';
import { BOOKS_REPOSITORY, AUTHORS_BOOKS_REPOSITORY } from '../constants/constants';

@Injectable()
export class BookRepository {
    constructor(@Inject(BOOKS_REPOSITORY) private readonly booksRepository: typeof Books,
                @Inject(AUTHORS_BOOKS_REPOSITORY) private readonly authorBookRepository: typeof AuthorsBooks) {}

    async getAll() {
        const authorBooks = await this.authorBookRepository.findAll<AuthorsBooks>({
            include: [
                Authors,
                Books,
            ],
        });
        // const books = await this.booksRepository.findAll<Books>({
        //     include: [
        //         AuthorsBooks,
        //     ],
        // });
        return authorBooks;
    }

    async getOneById(bookID: number): Promise<Books> {
        return await this.booksRepository.findOne({where: {id: bookID}});
    }
    async addBook(book: Books): Promise<Books> {
        return await this.booksRepository.create(book);
    }

    async updateBook(bookID: number, book: Books): Promise<object> {
        return await this.booksRepository.update(
            {
                title: book.title,
                price: book.price,
                img: book.img,
                description: book.description,
            },
            {
                where: {
                    id: bookID,
                },
            });
    }

    async deleteBook(bookID: number): Promise<object> {
        try {
            const book = await this.booksRepository.destroy({
                where: {
                    id: bookID,
                },
            });

            if (!book) {
                    return {
                        success: false,
                        message: 'book not found',
                        data: null,
                    };
            }
            return {
                success: true,
                message: 'book deleted',
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
