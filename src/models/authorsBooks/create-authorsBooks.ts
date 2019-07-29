import { Model, Table, PrimaryKey, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
// import { Authors, Books } from '../index';
import { Authors } from '../authors/create-author.model';
import { Books } from '../books/create-book.models';

@Table
export class AuthorsBooks extends Model<AuthorsBooks> {

    @ForeignKey(() => Authors)
    @PrimaryKey
    @Column
    authorId: number;

    @ForeignKey(() => Books)
    @PrimaryKey
    @Column
    bookId: number;

    @BelongsTo(() => Books)
    book: Books;

    @BelongsTo(() => Authors)
    author: Authors;

}
